'use client'

import { useEffect, useState, useCallback } from 'react'
import { MdClose } from 'react-icons/md'

export default function GoogleTranslate() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const initGoogleTranslate = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).google?.translate?.TranslateElement) {
      if (document.querySelector('.goog-te-combo')) return;
      
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
        },
        'google_translate_element'
      )
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    // 1. Define the Init callback globally so the script can find it
    (window as any).googleTranslateElementInit = initGoogleTranslate

    // 2. Add Google Translate script if it's not already in the document
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    } else if ((window as any).google?.translate?.TranslateElement) {
      // If script is already there, just init manually
      initGoogleTranslate()
    }

    // Polling as a fallback if the script loads but doesn't auto-init correctly
    const interval = setInterval(() => {
      if (!isInitialized && (window as any).google?.translate?.TranslateElement) {
        initGoogleTranslate()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [initGoogleTranslate, isInitialized])

  return (
    <div
      className="notranslate"
      style={{
        position: 'fixed',
        top: '20px', // Standard corner position
        left: '20px',
        zIndex: 199999, // Below Chatbot but above everything else
        pointerEvents: 'auto',
      }}
      onMouseEnter={() => setIsExpanded(true)}
    >
      {/* 🚀 TOGGLE BUTTON (Globe Icon) */}
      <div
        className="flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
        style={{
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          background: 'white',
          display: isExpanded ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.22)',
          border: '2px solid #2563eb',
          overflow: 'hidden',
        }}
      >
        <img 
          src="assets/translate_logo.jpeg" 
          alt="Translate" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />
      </div>

      {/* 🚀 TRANSLATOR WRAPPER (Always present but hidden/shown) */}
      <div
        className="flex items-center gap-3 transition-opacity duration-300"
        style={{
          background: 'white',
          padding: '8px 14px',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
          border: '1px solid #e2e8f0',
          display: isExpanded ? 'flex' : 'none',
          opacity: isExpanded ? 1 : 0,
          pointerEvents: isExpanded ? 'auto' : 'none',
        }}
      >
        {/* The actual target div for Google Translate - MUST be rendered to be populated */}
        <div id="google_translate_element" style={{ minWidth: '150px' }} />
        
        {/* CLOSE BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(false);
          }}
          className="flex items-center justify-center p-1.5 hover:bg-gray-100 rounded-full transition-all"
          style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
          title="Close Translator"
        >
          <MdClose size={22} color="#64748b" />
        </button>
      </div>

      {/* CSS FIXES FOR GOOGLE TRANSLATE UI */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide unwanted Google fragments */
        #google_translate_element .goog-te-gadget {
          font-family: inherit !important;
          font-size: 0 !important;
          color: transparent !important;
        }
        #google_translate_element .goog-te-gadget .goog-te-combo {
          margin: 0 !important;
          padding: 8px 10px !important;
          border-radius: 8px !important;
          border: 1px solid #cbd5e1 !important;
          font-size: 14px !important;
          color: #1e293b !important;
          background: #ffffff !important;
          outline: none !important;
          cursor: pointer !important;
          width: 100% !important;
        }
        #google_translate_element .goog-te-gadget img,
        #google_translate_element .goog-te-gadget span,
        #google_translate_element .goog-te-gadget b {
          display: none !important;
        }
        /* Generic banner hiding across body */
        .goog-te-banner-frame, .goog-te-banner-frame.skiptranslate, iframe.goog-te-banner-frame, .goog-te-banner {
          display: none !important;
        }
        body { top: 0 !important; }
      `}} />
    </div>
  )
}
