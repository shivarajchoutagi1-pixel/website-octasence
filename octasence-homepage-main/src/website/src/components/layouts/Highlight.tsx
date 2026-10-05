import Image from 'next/image';
import React from 'react';

import mainConfig from '@/configs/mainConfigs';

const Highlight = () => {
  return (
    <div
      className={`octa-card relative overflow-hidden flex flex-col lg:flex-row items-center justify-center p-8 lg:p-14 lg:rounded-[2rem] ${mainConfig.containerClass}`}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(96,165,250,0.8) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="absolute -left-12 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex justify-center lg:justify-end items-center w-full lg:w-1/2 mb-8 lg:mb-0 lg:mr-12">
        <Image
          src="https://res.cloudinary.com/dbibjvyhm/image/upload/v1728132440/website/photos/highlights/engineer_byss3s.webp"
          alt="Leader Portrait"
          width={444}
          height={469}
          className="grayscale w-full h-full max-w-[444px] rounded-[2rem] border border-white/10 transition-transform duration-500 ease-in-out transform hover:scale-[1.03] cursor-pointer"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2 text-center lg:text-left">
        <div className="flex justify-center lg:justify-start mb-8">
          <Image
            src="https://res.cloudinary.com/dbibjvyhm/image/upload/v1728132441/website/photos/highlights/google-org_clia2b.svg"
            alt="Google Logo"
            width={120}
            height={120}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Highlight;
