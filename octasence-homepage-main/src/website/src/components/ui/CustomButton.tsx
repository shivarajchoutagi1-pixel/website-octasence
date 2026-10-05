import React from 'react';

import { cn } from '@/lib/utils';

import { ButtonProps } from './button';

interface CustomButtonProps extends ButtonProps {
  className?: string;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'px-6 py-4 text-sm font-semibold transition-all duration-300 rounded-full',
        'active:scale-95',
        'bg-blue-600 text-white',
        'shadow-[0_14px_36px_rgba(37,99,235,0.25)] focus:outline-none',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
