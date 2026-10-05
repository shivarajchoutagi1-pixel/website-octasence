'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { sendOctasenceChatMessage } from '@/hooks/useOctasenceChat';

const SUGGESTED_PROMPTS = [
  'What does Octasence do for infrastructure monitoring?',
  'How does structural health monitoring work?',
  'Which industries do you support?',
  'How can we get in touch with your team?',
] as const;

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

type VoiceStatus = 'idle' | 'listening' | 'thinking' | 'speaking';
type ActiveMode = 'chat' | 'voice';

// ─── Web Speech API types ─────────────────────────────────────────────────────
interface ISpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}
interface ISpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}
interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: ISpeechRecognitionEvent) => void) | null;
  onend: ((e: Event) => void) | null;
  onerror: ((e: ISpeechRecognitionErrorEvent) => void) | null;
}
interface ISpeechRecognitionConstructor {
  new(): ISpeechRecognition;
}
declare global {
  interface Window {
    SpeechRecognition: ISpeechRecognitionConstructor;
    webkitSpeechRecognition: ISpeechRecognitionConstructor;
  }
}

// ─── OctaSence Logo ───────────────────────────────────────────────────────────
const OctaSenceLogo: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="octa-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </defs>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 50 + 28 * Math.cos(rad), y1 = 50 + 28 * Math.sin(rad);
      const x2 = 50 + 44 * Math.cos(rad), y2 = 50 + 44 * Math.sin(rad);
      return (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#octa-grad)" strokeWidth="5" strokeLinecap="round" />
          <circle cx={x2} cy={y2} r="5" fill="url(#octa-grad)" />
        </g>
      );
    })}
    <circle cx="50" cy="50" r="26" stroke="url(#octa-grad)" strokeWidth="5" fill="none" />
    <circle cx="50" cy="50" r="8" fill="url(#octa-grad)" />
  </svg>
);

// ─── Chat: Typing dots ────────────────────────────────────────────────────────
const TypingDots: React.FC = () => (
  <div className="flex items-center gap-2 px-2 py-2">
    <OctaSenceLogo size={26} className="flex-shrink-0" />
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="w-2 h-2 rounded-full bg-[#5b6cf3]"
          animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </div>
  </div>
);

// ─── Inline speaking bars ─────────────────────────────────────────────────────
const SpeakingBars: React.FC = () => (
  <span className="inline-flex items-end gap-[2px] ml-1.5 mb-0.5" style={{ height: 12 }}>
    {[0.6, 1, 0.7, 0.9, 0.5].map((s, i) => (
      <motion.span key={i} className="inline-block w-[2px] rounded-full bg-[#5b6cf3]"
        animate={{ scaleY: [s * 0.4, s, s * 0.4] }}
        transition={{ duration: 0.45 + i * 0.06, repeat: Infinity, ease: 'easeInOut' }}
        style={{ height: '100%', originY: 'bottom' }} />
    ))}
  </span>
);

// ─── Voice: Reactive Orb ─────────────────────────────────────────────────────
const VoiceOrb: React.FC<{ status: VoiceStatus; onClick: () => void }> = ({ status, onClick }) => {
  const orbColors: Record<VoiceStatus, string> = {
    idle:      'radial-gradient(circle at 35% 35%, #818cf8, #4f46e5 60%, #1e1b4b)',
    listening: 'radial-gradient(circle at 35% 35%, #f87171, #dc2626 60%, #450a0a)',
    thinking:  'radial-gradient(circle at 35% 35%, #fbbf24, #d97706 60%, #451a03)',
    speaking:  'radial-gradient(circle at 35% 35%, #34d399, #059669 60%, #022c22)',
  };
  const glowColors: Record<VoiceStatus, string> = {
    idle:      'rgba(99,102,241,0.45)',
    listening: 'rgba(220,38,38,0.5)',
    thinking:  'rgba(217,119,6,0.5)',
    speaking:  'rgba(5,150,105,0.5)',
  };
  const rippleColors: Record<VoiceStatus, string> = {
    idle:      'rgba(99,102,241,0.15)',
    listening: 'rgba(220,38,38,0.2)',
    thinking:  'rgba(217,119,6,0.15)',
    speaking:  'rgba(5,150,105,0.18)',
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: 168, height: 168 }}>
      {/* Ripple rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div key={ring} className="absolute rounded-full pointer-events-none"
          style={{ background: rippleColors[status] }}
          animate={
            status !== 'idle'
              ? { width: [84, 84 + ring * 42], height: [84, 84 + ring * 42], opacity: [0.7, 0] }
              : { width: 84 + ring * 8, height: 84 + ring * 8, opacity: 0.1 }
          }
          transition={
            status !== 'idle'
              ? { duration: 1.7, repeat: Infinity, delay: ring * 0.38, ease: 'easeOut' }
              : {}
          }
        />
      ))}

      {/* Thinking orbit ring */}
      {status === 'thinking' && (
        <motion.div className="absolute rounded-full border border-amber-400/30 pointer-events-none"
          style={{ width: 124, height: 124 }}
          animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400/80" />
        </motion.div>
      )}

      {/* Core orb */}
      <motion.button onClick={onClick}
        className="relative rounded-full focus:outline-none flex items-center justify-center"
        style={{
          width: 100, height: 100,
          background: orbColors[status],
          boxShadow: `0 0 48px 12px ${glowColors[status]}, inset 0 2px 10px rgba(255,255,255,0.18)`,
        }}
        animate={
          status === 'listening' ? { scale: [1, 1.08, 1] }
          : status === 'speaking' ? { scale: [1, 1.05, 0.97, 1.05, 1] }
          : { scale: [1, 1.025, 1] }
        }
        transition={{
          duration: status === 'listening' ? 0.75 : status === 'speaking' ? 0.5 : 3.2,
          repeat: Infinity, ease: 'easeInOut',
        }}
        whileTap={{ scale: 0.91 }}
      >
        {status === 'idle' && (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="white">
            <path d="M12 1a4 4 0 014 4v6a4 4 0 01-8 0V5a4 4 0 014-4z" opacity="0.95" />
            <path d="M19 10a7 7 0 01-14 0" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="17" x2="12" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="9" y1="21" x2="15" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        {status === 'listening' && (
          <div className="flex items-end gap-[3px]" style={{ height: 30 }}>
            {[0.5, 0.8, 1, 0.9, 0.6, 0.8, 0.5].map((h, i) => (
              <motion.div key={i} className="w-[3px] rounded-full bg-white"
                animate={{ scaleY: [h * 0.35, h, h * 0.3] }}
                transition={{ duration: 0.38 + i * 0.06, repeat: Infinity, ease: 'easeInOut' }}
                style={{ height: '100%', originY: 'bottom' }} />
            ))}
          </div>
        )}
        {status === 'thinking' && (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" opacity="0.85" />
            </svg>
          </motion.div>
        )}
        {status === 'speaking' && (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" opacity="0.95" />
            <motion.path d="M15.54 8.46a5 5 0 010 7.07" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.65, repeat: Infinity }} />
            <motion.path d="M19.07 4.93a10 10 0 010 14.14" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.65, repeat: Infinity, delay: 0.18 }} />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

// ─── Voice: Transcript ────────────────────────────────────────────────────────
const VoiceTranscript: React.FC<{
  userText: string; botText: string; interimText: string; status: VoiceStatus;
}> = ({ userText, botText, interimText, status }) => (
  <div className="flex flex-col items-center gap-3 w-full min-h-[88px]">
    <AnimatePresence mode="wait">
      {(userText || (status === 'listening' && interimText)) && (
        <motion.div key="user-t" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-center max-w-[88%]">
          <span className="text-white/35 text-[10px] uppercase tracking-widest block mb-0.5">You</span>
          <p className={`text-sm leading-snug ${status === 'listening' && interimText ? 'text-white/45 italic' : 'text-white/65'}`}>
            {status === 'listening' && interimText ? interimText : userText}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
    <AnimatePresence mode="wait">
      {botText && (
        <motion.div key="bot-t" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-center max-w-[88%]">
          <span className="text-indigo-300/60 text-[10px] uppercase tracking-widest block mb-0.5">OctaSence</span>
          <p className="text-sm leading-relaxed text-white/90">
            {botText}
            {status === 'speaking' && <SpeakingBars />}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ─── Icons ────────────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);
const MicIcon: React.FC<{ active?: boolean }> = ({ active = false }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"
    fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
    {active ? (
      <>
        <path d="M12 1a4 4 0 014 4v6a4 4 0 01-8 0V5a4 4 0 014-4z" />
        <path d="M19 10a7 7 0 01-14 0" strokeWidth={2} fill="none" stroke="currentColor" />
        <line x1="12" y1="17" x2="12" y2="21" strokeWidth={2} stroke="currentColor" />
        <line x1="9" y1="21" x2="15" y2="21" strokeWidth={2} stroke="currentColor" />
      </>
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a4 4 0 014 4v6a4 4 0 01-8 0V5a4 4 0 014-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 10a7 7 0 01-14 0" />
        <line x1="12" y1="17" x2="12" y2="21" strokeLinecap="round" />
        <line x1="9" y1="21" x2="15" y2="21" strokeLinecap="round" />
      </>
    )}
  </svg>
);
const SpeakerIcon: React.FC<{ muted?: boolean; size?: number }> = ({ muted = false, size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    {muted
      ? <><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></>
      : <><path d="M15.54 8.46a5 5 0 010 7.07" /><path d="M19.07 4.93a10 10 0 010 14.14" /></>}
  </svg>
);
const ExpandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
  </svg>
);
const CollapseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9H4m5 0V4M15 9h5m-5 0V4M9 15H4m5 0v5M15 15h5m-5 0v5" />
  </svg>
);

// ─── Hook: Speech Recognition ─────────────────────────────────────────────────
function useSpeechRecognition(
  onFinal: (text: string) => void,
  onInterim?: (text: string) => void,
) {
  const recRef = useRef<ISpeechRecognition | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [interimText, setInterimText] = useState('');
  const onFinalRef = useRef(onFinal);
  const onInterimRef = useRef(onInterim);
  useEffect(() => { onFinalRef.current = onFinal; }, [onFinal]);
  useEffect(() => { onInterimRef.current = onInterim; }, [onInterim]);

  useEffect(() => {
    const SR: ISpeechRecognitionConstructor | undefined =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    setIsSupported(!!SR);
    if (!SR) return;
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: ISpeechRecognitionEvent) => {
      let interim = '', final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t; else interim += t;
      }
      setInterimText(interim);
      onInterimRef.current?.(interim);
      if (final) { onFinalRef.current(final); setInterimText(''); }
    };
    rec.onend = () => { setIsRecording(false); setInterimText(''); };
    rec.onerror = (e: ISpeechRecognitionErrorEvent) => {
      console.error('STT error', e.error);
      setIsRecording(false); setInterimText('');
    };
    recRef.current = rec;
  }, []);

  const start = useCallback(() => {
    try { recRef.current?.start(); setIsRecording(true); } catch { /* already started */ }
  }, []);
  const stop = useCallback(() => {
    recRef.current?.stop(); setIsRecording(false); setInterimText('');
  }, []);
  const toggle = useCallback(() => {
    if (isRecording) stop(); else start();
  }, [isRecording, start, stop]);

  return { isRecording, isSupported, interimText, start, stop, toggle };
}

// ─── Hook: Text-to-Speech ─────────────────────────────────────────────────────
function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const onEndRef = useRef<(() => void) | null>(null);

  const speak = useCallback((text: string, id: string, onEnd?: () => void) => {
    if (!isSupported) { onEnd?.(); return; }
    window.speechSynthesis.cancel();
    onEndRef.current = onEnd ?? null;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US'; utter.rate = 1.0; utter.pitch = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((v) =>
      v.lang.startsWith('en') &&
      (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha'))
    );
    if (preferred) utter.voice = preferred;
    utter.onstart = () => { setIsSpeaking(true); setSpeakingId(id); };
    utter.onend = () => { setIsSpeaking(false); setSpeakingId(null); onEndRef.current?.(); };
    utter.onerror = () => { setIsSpeaking(false); setSpeakingId(null); };
    window.speechSynthesis.speak(utter);
  }, [isSupported]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel(); setIsSpeaking(false); setSpeakingId(null);
  }, []);

  return { speak, stop, isSpeaking, speakingId, isSupported };
}

// ─── Main Widget ──────────────────────────────────────────────────────────────
const ChatbotWidget: React.FC = () => {
  // ── Shared ──
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<ActiveMode>('chat');
  const [isExpanded, setIsExpanded] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', text: "Hi there! I'm the OctaSence AI Assistant. How can I help you today?", timestamp: new Date() },
  ]);

  // ── Chat ──
  const [inputValue, setInputValue] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Voice ──
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('idle');
  const [voiceUserText, setVoiceUserText] = useState('');
  const [voiceBotText, setVoiceBotText] = useState('');
  const [voiceInterim, setVoiceInterim] = useState('');
  const voiceActiveRef = useRef(false);

  // ── TTS (shared) ──
  const tts = useTextToSpeech();

  // ── STT: Chat ──
  const handleChatSttResult = useCallback((t: string) => {
    setInputValue((p) => (p ? p + ' ' + t : t));
  }, []);
  const chatStt = useSpeechRecognition(handleChatSttResult);

  // ── STT: Voice (needs voiceStt forward ref pattern) ──
  const voiceSttRef = useRef<{ start: () => void; stop: () => void } | null>(null);

  const handleVoiceSttFinal = useCallback(async (transcript: string) => {
    if (!voiceActiveRef.current) return;
    setVoiceUserText(transcript);
    setVoiceInterim('');
    setVoiceStatus('thinking');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: transcript, timestamp: new Date() };
    setMessages((p) => [...p, userMsg]);

    try {
      const { reply } = await sendOctasenceChatMessage(transcript);
      console.log("Bot reply:", reply); 
      const botId = (Date.now() + 1).toString();
      setMessages((p) => [...p, { id: botId, role: 'bot', text: reply, timestamp: new Date() }]);
      setVoiceBotText(reply);
      setVoiceStatus('speaking');
      tts.speak(reply, botId, () => {
        if (!voiceActiveRef.current) return;
        setVoiceStatus('listening');
        voiceSttRef.current?.start();
      });
    } catch (err) {
  console.error("VOICE ERROR:", err);

  const fallback = "Sorry, I'm having trouble responding right now. Please try again.";

  setVoiceBotText(fallback);
  setVoiceStatus('speaking');

  tts.speak(fallback, "error");
}
  }, [tts]);

  const handleVoiceInterim = useCallback((t: string) => { setVoiceInterim(t); }, []);
  const voiceStt = useSpeechRecognition(handleVoiceSttFinal, handleVoiceInterim);

  // Keep ref in sync
  useEffect(() => {
    voiceSttRef.current = { start: voiceStt.start, stop: voiceStt.stop };
  }, [voiceStt.start, voiceStt.stop]);

  // ── Scroll chat ──
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatLoading]);

  useEffect(() => {
    if (isOpen && activeMode === 'chat') setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen, activeMode]);

  // ── Chat mode auto-TTS ──
  useEffect(() => {
    if (activeMode !== 'chat' || !ttsEnabled || !tts.isSupported) return;
    const last = messages[messages.length - 1];
    if (last && last.role === 'bot' && last.id !== '1') {
      tts.speak(last.text, last.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  // ── Mode switching ──
  const enterVoiceMode = useCallback(() => {
    chatStt.stop(); tts.stop();
    setVoiceUserText(''); setVoiceBotText(''); setVoiceInterim('');
    setVoiceStatus('idle'); voiceActiveRef.current = false;
    setActiveMode('voice');
  }, [chatStt, tts]);

  const exitVoiceMode = useCallback(() => {
    voiceActiveRef.current = false;
    voiceStt.stop(); tts.stop();
    setVoiceStatus('idle');
    setActiveMode('chat');
  }, [voiceStt, tts]);

  // ── Orb tap ──
  const handleOrbTap = useCallback(() => {
    if (voiceStatus === 'thinking') return;
    if (voiceStatus === 'speaking') {
      tts.stop(); setVoiceStatus('idle'); voiceActiveRef.current = false; return;
    }
    if (voiceStatus === 'listening') {
      voiceStt.stop(); setVoiceStatus('idle'); voiceActiveRef.current = false; return;
    }
    // idle → listen
    setVoiceUserText(''); setVoiceBotText(''); setVoiceInterim('');
    voiceActiveRef.current = true;
    setVoiceStatus('listening');
    voiceStt.start();
  }, [voiceStatus, tts, voiceStt]);

  // ── Close ──
  const handleClose = useCallback(() => {
    voiceActiveRef.current = false;
    voiceStt.stop(); tts.stop(); chatStt.stop();
    setVoiceStatus('idle'); setIsOpen(false);
  }, [voiceStt, tts, chatStt]);

  // ── Chat send ──
  const sendChatMessage = useCallback(async (rawText: string) => {
    const text = rawText.trim(); if (!text) return;
    chatStt.stop(); tts.stop();
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, timestamp: new Date() };
    setMessages((p) => [...p, userMsg]);
    setInputValue(''); setIsChatLoading(true);
    try { 
      const { reply } = await sendOctasenceChatMessage(text);
      setMessages((p) => [...p, { id: (Date.now() + 1).toString(), role: 'bot', text: reply, timestamp: new Date() }]);
    } catch {
      setMessages((p) => [...p, {
        id: (Date.now() + 1).toString(), role: 'bot',
        text: "I'm having trouble connecting right now. Please try again or reach out to support@octasence.com.",
        timestamp: new Date(),
      }]);
    } finally { setIsChatLoading(false); }
  }, [chatStt, tts]);

  const handleChatSend = useCallback(() => void sendChatMessage(inputValue), [inputValue, sendChatMessage]);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleChatSend(); }
  };

  const showSuggestions = messages.length === 1 && messages[0]?.role === 'bot' && !isChatLoading;
  const chatDisplayValue = chatStt.isRecording && chatStt.interimText
    ? (inputValue ? inputValue + ' ' + chatStt.interimText : chatStt.interimText)
    : inputValue;

  const voiceStatusLabel: Record<VoiceStatus, string> = {
    idle:      'Tap to speak',
    listening: 'Listening…',
    thinking:  'Thinking…',
    speaking:  'Speaking…',
  };

  // ── Dimensions ──
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  useEffect(() => {
    const fn = () => { setWindowWidth(window.innerWidth); setWindowHeight(window.innerHeight); };
    window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn);
  }, []);
  const isMobile = windowWidth < 640;
  const widgetWidth = isMobile ? Math.min(windowWidth - 48, 430) : (isExpanded ? 430 : 360);
  const widgetHeight = isMobile ? Math.min(windowHeight - 140, 610) : (isExpanded ? 610 : 520);

  return (
    <div className="fixed bottom-6 right-6 z-[2147483647] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div key="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{ width: widgetWidth, height: widgetHeight }}
            className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >

            {/* ══ SHARED HEADER ══ */}
            <div className={`flex-shrink-0 transition-colors duration-500 ${
              activeMode === 'voice' ? 'bg-[#0f0c29]' : 'bg-gradient-to-r from-[#5b6cf3] to-[#7c3aed]'
            }`}>
              {/* Top row */}
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                {activeMode === 'chat' && tts.isSupported ? (
                  <button
                    onClick={() => { setTtsEnabled((v) => !v); if (tts.isSpeaking) tts.stop(); }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition"
                  >
                    <SpeakerIcon muted={!ttsEnabled} size={13} />
                    <span>{ttsEnabled ? 'Voice On' : 'Voice Off'}</span>
                  </button>
                ) : <div />}
                <button onClick={handleClose}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition text-white">
                  <CloseIcon />
                </button>
              </div>

              {/* Logo row */}
              <div className="flex items-center gap-3 px-4 pb-2">
                <div className="relative flex-shrink-0">
                  <OctaSenceLogo size={40} />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white shadow-sm transition-colors ${
                    voiceStatus === 'listening' ? 'bg-red-400'
                    : voiceStatus === 'thinking' ? 'bg-amber-400'
                    : voiceStatus === 'speaking' ? 'bg-emerald-400'
                    : 'bg-green-400'
                  }`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white font-bold text-sm whitespace-nowrap leading-tight">OctaSence AI Assistant</p>
                  <p className="text-white/60 text-xs mt-0.5">
                    {activeMode === 'voice' ? 'Hands-free voice conversation' : 'An expert from our team is on the way'}
                  </p>
                </div>
              </div>

              {/* Controls row — mode toggle + expand/zoom */}
              <div className="flex items-center gap-2 px-4 pb-3">
                {/* ── Mode pill toggle ── */}
                <div className="flex items-center rounded-full bg-white/10 p-0.5 gap-0.5">
                  {(['chat', 'voice'] as ActiveMode[]).map((mode) => (
                    <motion.button
                      key={mode}
                      onClick={() => mode === 'voice' ? enterVoiceMode() : exitVoiceMode()}
                      className={`relative px-3.5 py-1 rounded-full text-xs font-semibold transition-all capitalize ${
                        activeMode === mode
                          ? 'text-[#5b6cf3] bg-white shadow-sm'
                          : 'text-white/65 hover:text-white'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {mode === 'voice' && (
                        <motion.span
                          className="mr-1.5 inline-block w-1.5 h-1.5 rounded-full align-middle"
                          style={{ background: voiceStatus !== 'idle' && activeMode === 'voice' ? '#f87171' : 'rgba(255,255,255,0.35)' }}
                          animate={voiceStatus === 'listening' ? { opacity: [1, 0.3, 1] } : {}}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}
                      {mode === 'chat' && <span className="mr-1.5">💬</span>}
                      {mode}
                    </motion.button>
                  ))}
                </div>

                {/* Expand + zoom (chat only) */}
                {activeMode === 'chat' && (
                  <div className="flex items-center gap-1.5 ml-auto">
                    <button onClick={() => setIsExpanded((p) => !p)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition">
                      {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
                    </button>
                    <button onClick={() => setFontSize((f) => Math.min(f + 2, 22))}
                      className="w-7 h-7 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] flex items-center justify-center text-white font-bold text-lg leading-none transition shadow">+</button>
                    <button onClick={() => setFontSize((f) => Math.max(f - 2, 10))}
                      className="w-7 h-7 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] flex items-center justify-center text-white font-bold text-lg leading-none transition shadow">−</button>
                  </div>
                )}
              </div>
            </div>

            {/* ══ BODY ══ */}
            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">

                {/* ── CHAT MODE ── */}
                {activeMode === 'chat' && (
                  <motion.div key="chat-body"
                    initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-[#f5f6ff]">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-start gap-2'}`}>
                          {msg.role === 'bot' && <div className="flex-shrink-0 mt-1"><OctaSenceLogo size={26} /></div>}
                          <div className="flex flex-col gap-1 max-w-[75%]">
                            <div className={`rounded-2xl px-4 py-2.5 shadow-sm leading-relaxed ${
                              msg.role === 'user' ? 'bg-[#5b6cf3] text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm'
                            }`} style={{ fontSize }}>
                              {msg.text}
                              {tts.speakingId === msg.id && <SpeakingBars />}
                            </div>
                            {msg.role === 'bot' && tts.isSupported && (
                              <button onClick={() => tts.speakingId === msg.id ? tts.stop() : tts.speak(msg.text, msg.id)}
                                className="self-start flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#5b6cf3] transition px-1">
                                <SpeakerIcon muted={tts.speakingId === msg.id} size={11} />
                                <span>{tts.speakingId === msg.id ? 'Stop' : 'Read aloud'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      {isChatLoading && <TypingDots />}
                      {showSuggestions && (
                        <div className="flex flex-col gap-2 pt-1">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 px-1">Suggested questions</p>
                          <div className="flex flex-wrap gap-2">
                            {SUGGESTED_PROMPTS.map((p) => (
                              <button key={p} disabled={isChatLoading} onClick={() => void sendChatMessage(p)}
                                className="text-left text-[13px] leading-snug rounded-xl border border-[#5b6cf3]/35 bg-white px-3 py-2 text-gray-700 hover:bg-[#eef0ff] hover:border-[#5b6cf3]/55 transition-colors disabled:opacity-50 max-w-full">
                                {p}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Recording banner */}
                    <AnimatePresence>
                      {chatStt.isRecording && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 36, opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-between bg-red-50 border-t border-red-100 px-4 overflow-hidden flex-shrink-0">
                          <div className="flex items-center gap-2">
                            <motion.div className="w-2.5 h-2.5 rounded-full bg-red-500"
                              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                            <span className="text-xs font-medium text-red-600">Listening…</span>
                          </div>
                          <span className="text-[11px] text-red-400 truncate max-w-[55%] italic">
                            {chatStt.interimText || 'Speak now'}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Input */}
                    <div className="px-3 py-3 bg-white border-t border-gray-100 flex gap-2 items-center flex-shrink-0">
                      <input ref={inputRef} value={chatDisplayValue}
                        onChange={(e) => { if (!chatStt.isRecording) setInputValue(e.target.value); }}
                        onKeyDown={handleKeyDown} readOnly={chatStt.isRecording}
                        className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-gray-700 outline-none focus:border-[#5b6cf3] focus:ring-2 focus:ring-[#5b6cf3]/20 transition bg-gray-50"
                        placeholder={chatStt.isRecording ? 'Listening…' : 'Type or speak a message…'}
                        style={{ fontSize }} />
                      {chatStt.isSupported && (
                        <motion.button onClick={chatStt.toggle} whileTap={{ scale: 0.88 }}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow flex-shrink-0 ${
                            chatStt.isRecording ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                          }`}
                          animate={chatStt.isRecording ? { boxShadow: ['0 0 0 0 rgba(239,68,68,0.4)', '0 0 0 8px rgba(239,68,68,0)', '0 0 0 0 rgba(239,68,68,0)'] } : {}}
                          transition={{ duration: 1.2, repeat: Infinity }}>
                          <MicIcon active={chatStt.isRecording} />
                        </motion.button>
                      )}
                      <button onClick={handleChatSend}
                        disabled={!inputValue.trim() || isChatLoading || chatStt.isRecording}
                        className="w-9 h-9 rounded-full bg-[#5b6cf3] hover:bg-[#4a5be0] disabled:opacity-50 flex items-center justify-center transition-all active:scale-90 shadow flex-shrink-0">
                        <SendIcon />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── VOICE MODE ── */}
                {activeMode === 'voice' && (
                  <motion.div key="voice-body"
                    initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 28 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center justify-between py-7 px-4"
                    style={{ background: 'linear-gradient(160deg, #0f0c29 0%, #1a1040 55%, #0d1b2a 100%)' }}
                  >
                    {/* Starfield */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(30)].map((_, i) => (
                        <motion.div key={i} className="absolute rounded-full bg-white"
                          style={{
                            width: Math.random() * 2 + 1, height: Math.random() * 2 + 1,
                            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.35 + 0.08,
                          }}
                          animate={{ opacity: [0.08, 0.45, 0.08] }}
                          transition={{ duration: 2.2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2.5 }}
                        />
                      ))}
                    </div>

                    {/* Status chip */}
                    <motion.div key={voiceStatus}
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                      className="relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full ${
                          voiceStatus === 'idle' ? 'bg-white/30'
                          : voiceStatus === 'listening' ? 'bg-red-400'
                          : voiceStatus === 'thinking' ? 'bg-amber-400'
                          : 'bg-emerald-400'
                        }`}
                        animate={voiceStatus !== 'idle' ? { opacity: [1, 0.35, 1] } : {}}
                        transition={{ duration: 0.75, repeat: Infinity }}
                      />
                      <span className="text-white/75 text-xs font-medium tracking-wide">
                        {voiceStatusLabel[voiceStatus]}
                      </span>
                    </motion.div>

                    {/* Orb */}
                    <div className="relative z-10 flex flex-col items-center gap-5">
                      <VoiceOrb status={voiceStatus} onClick={handleOrbTap} />
                      <p className="text-white/28 text-[11px] text-center leading-snug max-w-[190px]">
                        {voiceStatus === 'idle'
                          ? 'Tap the orb to start a voice conversation'
                          : voiceStatus === 'thinking' ? 'Processing your request…'
                          : 'Tap the orb to stop'}
                      </p>
                    </div>

                    {/* Transcript */}
                    <div className="relative z-10 w-full">
                      <VoiceTranscript
                        userText={voiceUserText}
                        botText={voiceBotText}
                        interimText={voiceInterim}
                        status={voiceStatus}
                      />
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB ── */}
      <motion.button
        onHoverStart={() => setIsLogoHovered(true)}
        onHoverEnd={() => setIsLogoHovered(false)}
        onClick={() => setIsOpen((p) => !p)}
        whileTap={{ scale: 0.88 }}
        className="relative focus:outline-none"
        aria-label="Open OctaSence AI Chat"
        style={{ background: 'none', border: 'none', padding: 0 }}
      >
        <motion.div
          animate={{ rotate: isLogoHovered ? 360 : 0 }}
          transition={isLogoHovered ? { duration: 2, ease: 'linear', repeat: Infinity } : { duration: 0.5, ease: 'easeOut' }}
        >
          <OctaSenceLogo size={64} className="drop-shadow-xl" />
        </motion.div>
        <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white shadow-md transition-colors duration-300 ${
          isOpen ? 'bg-green-400' : 'bg-gray-400'
        }`} />
      </motion.button>
    </div>
  );
};

export default ChatbotWidget;