'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import mainConfig from '@/configs/mainConfigs';
import { useDispatch } from '@/hooks';

import { CustomButton } from '../ui';

const cardBaseClassName =
  'octa-card group relative overflow-hidden flex flex-col justify-between items-start text-start md:rounded-[1.75rem] p-8 md:p-10 w-full cursor-pointer transition-all duration-300 hover:-translate-y-1';

const ActionButtons = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div
      className={`flex flex-col md:flex-row gap-6 w-full ${mainConfig.containerClass}`}
    >
      <CustomButton
        onClick={() => {
          router.push('/products-infrastructure-intelligence');
        }}
        className="bg-transparent p-0 m-0"
      >
        <div className={`${cardBaseClassName} border-blue-500/20`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-[#0000FF]/10 opacity-80" />
          <div className="relative z-10">
            <div className="octa-pill mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Explore
            </div>
            <h3 className="octa-heading text-2xl md:text-3xl mb-4">
              Explore our digital tools and monitor infrastructure intelligence
              in real time.
            </h3>
          </div>
          <p className="relative z-10 mt-6 text-lg text-white/80 group-hover:text-white transition-colors">
            Explore data -&gt;
          </p>
        </div>
      </CustomButton>

      <CustomButton
        onClick={() => {
          router.push('/careers');
        }}
        className="bg-transparent p-0 m-0"
      >
        <div className={`${cardBaseClassName} border-white/10`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-blue-500/10" />
          <div className="relative z-10">
            <div className="octa-pill mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Collaborate
            </div>
            <h3 className="octa-heading text-2xl md:text-3xl mb-4">
              Get involved and discover how you can support the OctaSence
              vision.
            </h3>
          </div>
          <p className="relative z-10 mt-6 text-lg text-white/80 group-hover:text-white transition-colors">
            Get involved -&gt;
          </p>
        </div>
      </CustomButton>
    </div>
  );
};

export default ActionButtons;
