'use client';

import Link from 'next/link';
import { useState } from 'react';

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);
  const phone = '919019772123'; // +91 prefix for India
  const message = encodeURIComponent(
    "Hi OctaSence, I'd like to learn more about your platform.",
  );
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <div
      className="fixed bottom-24 right-6 z-50 flex items-center gap-3"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Tooltip */}
      <div
        className="pointer-events-none transition-all duration-300 whitespace-nowrap"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(8px)',
        }}
      >
        <div className="bg-[#0a0a14] border border-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
          Chat with us
        </div>
      </div>

      {/* Button */}
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center w-13 h-13 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          width: '64px',
          height: '64px',
          background: hovered
            ? 'linear-gradient(135deg, #25d366, #128c7e)'
            : 'linear-gradient(135deg, #22c55e, #16a34a)',
          boxShadow: hovered
            ? '0 0 24px rgba(37,211,102,0.5)'
            : '0 4px 16px rgba(0,0,0,0.4)',
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="34"
          height="34"
          fill="white"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.492.648 4.835 1.784 6.872L2 30l7.328-1.752A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.896-1.608l-.424-.252-4.352 1.04 1.072-4.224-.276-.436A11.528 11.528 0 0 1 4.4 16C4.4 9.59 9.59 4.4 16 4.4S27.6 9.59 27.6 16 22.41 27.6 16 27.6zm6.32-8.672c-.344-.172-2.036-1.004-2.352-1.12-.316-.112-.548-.168-.78.168-.228.34-.892 1.12-1.092 1.348-.2.232-.4.26-.744.088-.344-.172-1.452-.536-2.768-1.708-1.024-.912-1.712-2.04-1.912-2.384-.2-.344-.02-.528.148-.7.152-.152.344-.396.516-.596.168-.196.224-.34.336-.564.112-.228.056-.428-.028-.6-.084-.172-.78-1.876-1.068-2.572-.284-.676-.572-.584-.78-.596l-.664-.012c-.228 0-.596.084-.908.424-.312.34-1.192 1.164-1.192 2.84s1.22 3.296 1.392 3.524c.168.228 2.404 3.672 5.824 5.148.812.352 1.448.56 1.944.716.816.26 1.56.224 2.148.136.656-.1 2.036-.832 2.324-1.636.284-.804.284-1.492.2-1.636-.084-.144-.312-.228-.656-.4z" />
        </svg>

        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: 'rgba(37,211,102,0.3)' }}
        />
      </Link>
    </div>
  );
};

export default WhatsAppButton;
