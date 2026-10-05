'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface FloatingVideoPlayerProps {
  videoSrc?: string;
  poster?: string;
}

const FloatingVideoPlayer: React.FC<FloatingVideoPlayerProps> = ({
  videoSrc = '/intro.mp4',
  poster,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoSrc, setCurrentVideoSrc] = useState(videoSrc);
  const [showVideo, setShowVideo] = useState(true);
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Changed to false initially
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const totalVideos = 5;
    const weekInMs = 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    // Each video appears for 7 days (1 week)
    // The cycle repeats every 5 weeks (total 5 videos)
    const weeksSinceEpoch = Math.floor(now / weekInMs);
    const videoIndex = (weeksSinceEpoch % totalVideos) + 1;

    setCurrentVideoSrc(`/videos/popup/video${videoIndex}.mp4`);
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      const video = videoRef.current;
      const handleTimeUpdate = () => {
        if (video.duration) {
          setProgress((video.currentTime / video.duration) * 100);
        }
      };

      video.addEventListener('timeupdate', handleTimeUpdate);

      // Auto play video when shown
      video.play().catch(err => console.log("Autoplay failed:", err));
      setIsPlaying(true);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [showVideo, currentVideoSrc]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleCloseVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    videoRef.current?.pause();
    setVisible(false);
  };



  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  const collapsedW = 180;
  const collapsedH = 320;
  const expandedW = 320;
  const expandedH = 569;



  if (!visible) return null;

  return (
    <>
      <AnimatePresence mode="wait">


        {showVideo && (
          <motion.div
            key="floating-video"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              position: 'fixed',
              bottom: 24,
              left: 24,
              zIndex: 9999,
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
              background: '#000',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {/* ── Video wrapper ── */}
            <motion.div
              animate={{
                width: expanded ? expandedW : collapsedW,
                height: expanded ? expandedH : collapsedH,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <video
                ref={videoRef}
                src={currentVideoSrc}
                poster={poster}
                playsInline
                autoPlay
                muted
                loop
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* ── Top-right overlay: expand + close ── */}
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  display: 'flex',
                  gap: 6,
                  zIndex: 2,
                }}
              >
                <button
                  onClick={toggleExpand}
                  title={expanded ? 'Collapse' : 'Expand'}
                  style={iconBtnStyle}
                >
                  {expanded ? (
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="4 14 10 14 10 20" />
                      <polyline points="20 10 14 10 14 4" />
                      <line x1="10" y1="14" x2="3" y2="21" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                    </svg>
                  ) : (
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={handleCloseVideo}
                  title="Close"
                  style={{ ...iconBtnStyle, color: '#ff6b6b' }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* ── Centre: play / pause button (HIDDEN as per user request) ── */}
              <div
                onClick={togglePlay}
                style={{
                  position: 'absolute',
                  inset: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                {/* Play button removed */}
              </div>

              {/* ── Bottom-left: unmute / mute button ── */}
              <AnimatePresence>
                {isMuted && (
                  <motion.button
                    key="unmute-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={toggleMute}
                    title="Tap to unmute"
                    style={{
                      position: 'absolute',
                      bottom: 14,
                      left: 10,
                      zIndex: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      background: 'rgba(0,0,0,0.55)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 20,
                      color: '#fff',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      padding: '4px 8px 4px 6px',
                      cursor: 'pointer',
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                    Tap to unmute
                  </motion.button>
                )}

                {!isMuted && (
                  <motion.button
                    key="mute-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={toggleMute}
                    title="Mute"
                    style={{
                      position: 'absolute',
                      bottom: 14,
                      left: 10,
                      zIndex: 3,
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(255,255,255,0.7)',
                      cursor: 'pointer',
                      padding: 4,
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* ── Progress bar ── */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: 'rgba(255,255,255,0.15)',
                  zIndex: 2,
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #4f8fff, #22d36e)',
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  );
};

const iconBtnStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderRadius: 6,
  color: '#fff',
  width: 26,
  height: 26,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: 0,
  filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.6))',
};

export default FloatingVideoPlayer;
