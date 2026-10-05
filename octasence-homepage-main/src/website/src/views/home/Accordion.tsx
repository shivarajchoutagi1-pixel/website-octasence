import { motion } from 'framer-motion';
import type React from 'react';
import { useState } from 'react';

type AccordionItem = {
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenItem((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openItem === index;

        return (
          <motion.div
            key={index}
            layout
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`overflow-hidden border transition-all duration-300 ${
              isOpen
                ? 'border-[#CFE0FF] bg-[linear-gradient(180deg,#F8FBFF_0%,#EEF5FF_100%)] shadow-[0_18px_38px_rgba(15,23,42,0.06)]'
                : 'border-transparent bg-white/60 hover:border-[#D9E6FB] hover:bg-white/90'
            }`}
          >
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left outline-none"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                      isOpen
                        ? 'bg-[#10284A] text-white'
                        : 'bg-[#E5EEFB] text-[#29446C]'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg tracking-[-0.02em] text-[#08162C]">
                    {item.title}
                  </span>
                </div>
              </div>

              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.22 }}
                className={`mt-1 text-xl ${
                  isOpen ? 'text-[#10284A]' : 'text-[#6A84AA]'
                }`}
              >
                +
              </motion.span>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: isOpen ? 'auto' : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div
                className="border-t border-[#D8E6FB] px-4 pb-4 pt-3 text-sm leading-relaxed text-[#45638E]"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {item.content}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};
