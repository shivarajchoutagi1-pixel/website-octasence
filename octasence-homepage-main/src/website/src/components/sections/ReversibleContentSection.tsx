import Image from 'next/image';
import React, { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ReversibleContentSectionProps = {
  title: string;
  subtitle?: string;
  description: string | ReactNode;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  reverse?: boolean;
  backgroundColor?: string;
  subtitleColor?: string;
  subtitleBgColor?: string;
  leftWidth?: string;
  rightWidth?: string;
  imageClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  linkClassName?: string;
};

const ReversibleContentSection: React.FC<ReversibleContentSectionProps> = ({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink,
  imageUrl,
  reverse = false,
  backgroundColor = 'bg-[#f0f4fa]',
  subtitleColor = 'text-blue-600',
  subtitleBgColor = 'bg-blue-100',
  leftWidth = 'lg:w-1/2',
  rightWidth = 'lg:w-1/2',
  imageClassName = 'object-contain lg:object-cover',
  titleClassName,
  descriptionClassName,
  linkClassName,
}) => {
  return (
    <section className={cn(backgroundColor, 'py-16 px-4')}>
      <div
        className={cn(
          'max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-6',
          reverse && 'lg:flex-row-reverse',
        )}
      >
        {/* Content Section */}
        <div
          className={cn(leftWidth, 'w-full text-center lg:text-left space-y-8')}
        >
          {subtitle && (
            <span
              className={cn(
                'inline-block text-sm font-medium py-1 px-3 rounded-full',
                subtitleColor,
                subtitleBgColor,
              )}
            >
              {subtitle}
            </span>
          )}
          <h2
            className={cn(
              'text-3xl lg:text-5xl font-semibold text-[#08162C]',
              titleClassName,
            )}
          >
            {title}
          </h2>
          {typeof description === 'string' ? (
            <p className={cn('text-lg text-[#31456F]', descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={cn('text-lg text-[#31456F]', descriptionClassName)}>
              {description}
            </div>
          )}

          {buttonLink.startsWith('http') ? (
            <a
              href={buttonLink}
              className={cn(
                'inline-block text-[#0F47D7] font-semibold hover:underline mt-4',
                linkClassName,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {buttonText} →
            </a>
          ) : (
            <a
              href={buttonLink}
              className={cn(
                'inline-block text-[#0F47D7] font-semibold hover:underline mt-4',
                linkClassName,
              )}
            >
              {buttonText} →
            </a>
          )}
        </div>

        {/* Image Section */}
        <div
          className={cn(
            rightWidth,
            'w-full flex justify-center lg:justify-end',
          )}
        >
          <div className="relative w-full h-80 sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(imageClassName)}
              priority
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReversibleContentSection;
