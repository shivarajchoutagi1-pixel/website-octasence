'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { TbMenu } from 'react-icons/tb';

import AuthModal from '@/components/auth/AuthModal';
import { CustomButton } from '@/components/ui';
import { cn } from '@/lib/utils';

type DropdownItem = {
  title: string;
  description?: string;
  href: string;
};

type NavItem =
  | { type: 'link'; label: string; href: string }
  | { type: 'dropdown'; label: string; items: DropdownItem[] };

const navItems: NavItem[] = [
  { type: 'link', label: 'Home', href: '/' },
  {
    type: 'dropdown',
    label: 'About',
    items: [
      { title: 'About OctaSence', href: '/about-us' },
      { title: 'Careers', href: '/careers' },
      { title: 'Contact Us', href: '/contact' },
      { title: 'FAQ', href: '/faq' },
    ],
  },
  { type: 'link', label: 'Blogs', href: '/blogs' },
];

function Dropdown({ label, items }: { label: string; items: DropdownItem[] }) {
  return (
    <div className="relative group">
      <div className="flex cursor-pointer items-center text-base tracking-[0.02em] text-white/78 transition-colors hover:text-white">
        {label}
      </div>
      <div className="absolute left-0 top-full hidden z-[9999] pt-2 group-hover:block">
        <div className="w-[320px] rounded-2xl border border-white/10 bg-[#031629] p-4 shadow-[0_12px_40px_rgba(2,6,23,0.35)]">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cta-category="navbar"
              data-cta-label={`dropdown_${label}_${item.title}`}
              className="block rounded-xl p-3 text-white/80 transition-colors hover:bg-white/5 hover:text-white"
            >
              <div>{item.title}</div>
              {item.description && (
                <div className="text-sm text-white/45">{item.description}</div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const lastScrollY = useRef(0);
  const calcomUrl = process.env.NEXT_PUBLIC_CALCOM_URL || 'https://cal.com/';
  const embeddedCalcomUrl = calcomUrl.includes('?')
    ? `${calcomUrl}&embed=true`
    : `${calcomUrl}?embed=true`;

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setIsScrolled(current > 50);
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isSchedulerOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSchedulerOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isSchedulerOpen]);

  return (
    <div
      className={cn(
        'navbar-wrapper fixed top-0 w-full z-[10000] transition-all duration-300',
        isScrolled
          ? 'bg-[#031629] backdrop-blur-xl border-b border-white/10 shadow-[0_12px_40px_rgba(2,6,23,0.35)]'
          : 'bg-transparent',
      )}
    >
      <nav className="relative mx-auto flex max-w-[1440px] items-center justify-between px-6 py-2 lg:px-12">
        <Link
          href="/"
          className="flex items-center"
          data-cta-category="navbar"
          data-cta-label="logo_home"
        >
          <div className="flex flex-col items-center text-center leading-tight">
            <Image
              src="/assets/images/logo.avif"
              alt="OctaSence logo"
              width={300}
              height={300}
              className="h-16 w-auto origin-center scale-125 object-contain md:h-20 md:scale-150"
              priority
            />

            <span className="font-outfit text-xs font-semibold tracking-wide text-gray-300 md:text-sm">
              Agentic AI for Zero Infrastructure Failures.
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            data-cta-category="navbar"
            data-cta-label="desktop_home"
            className="text-base tracking-[0.02em] text-white/78 transition-colors hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/solutions-infrastructure-intelligence"
            data-cta-category="navbar"
            data-cta-label="desktop_solutions"
            className="text-base tracking-[0.02em] text-white/78 transition-colors hover:text-white"
          >
            Solutions
          </Link>

          <Link
            href="/products-infrastructure-intelligence"
            data-cta-category="navbar"
            data-cta-label="desktop_products"
            className="text-base tracking-[0.02em] text-white/78 transition-colors hover:text-white"
          >
            Products
          </Link>

          <Link
            href="/applications-infrastructure-intelligence"
            data-cta-category="navbar"
            data-cta-label="desktop_case_studies"
            className="text-base tracking-[0.02em] text-white/78 transition-colors hover:text-white"
          >
            Case Studies
          </Link>

          {navItems
            .filter((item) => item.label !== 'Home')
            .map((item) => {
              if (item.type === 'link') {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    data-cta-category="navbar"
                    data-cta-label={`desktop_${item.label}`}
                    className="text-base tracking-[0.02em] text-white/78 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <Dropdown
                  key={item.label}
                  label={item.label}
                  items={item.items}
                />
              );
            })}

          <CustomButton
            type="button"
            onClick={() => setIsSchedulerOpen(true)}
            data-cta-category="navbar"
            data-cta-label="desktop_schedule_call"
            className="octa-button px-6 py-2.5"
          >
            Schedule Call
          </CustomButton>

          {/* User Auth Icon */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="p-1 ml-4 rounded-full bg-[#031629] border-2 border-transparent hover:border-[#3b82f6] hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg group overflow-hidden h-[60px] w-[60px]"
            title="User Account Portal"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/assets/images/user-icon.png"
                alt="User Account"
                width={56}
                height={56}
                className="w-full h-full object-cover rounded-full transition-transform group-hover:scale-110"
                onError={(e) => {
                  (e.target as any).src =
                    'https://cdn-icons-png.flaticon.com/512/1144/1144760.png';
                }}
                priority
              />
            </div>
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
        >
          {menuOpen ? <RiCloseFill size={24} /> : <TbMenu size={28} />}
        </button>

        {menuOpen && (
          <div className="absolute left-0 top-full z-[9998] w-full rounded-b-3xl border-t border-white/10 bg-[#031629] p-4 shadow-[0_12px_40px_rgba(2,6,23,0.35)] md:hidden">
            <Link
              href="/"
              data-cta-category="navbar"
              data-cta-label="mobile_home"
              className="block py-2.5 text-white/80"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/solutions-infrastructure-intelligence"
              data-cta-category="navbar"
              data-cta-label="mobile_solutions"
              className="block py-2.5 text-white/80"
              onClick={() => setMenuOpen(false)}
            >
              Solutions
            </Link>

            <Link
              href="/applications-infrastructure-intelligence"
              data-cta-category="navbar"
              data-cta-label="mobile_case_studies"
              className="block py-2.5 text-white/80"
              onClick={() => setMenuOpen(false)}
            >
              Case Studies
            </Link>

            {navItems
              .filter((item) => item.label !== 'Home')
              .map((item) => {
                if (item.type === 'link') {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      data-cta-category="navbar"
                      data-cta-label={`mobile_${item.label}`}
                      className="block py-2.5 text-white/80"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <div key={item.label} className="mb-3">
                    <div className="py-1 text-white">{item.label}</div>
                    {item.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        data-cta-category="navbar"
                        data-cta-label={`mobile_${item.label}_${sub.title}`}
                        className="block py-1.5 pl-3 text-white/65"
                        onClick={() => setMenuOpen(false)}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                );
              })}

            <CustomButton
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setIsSchedulerOpen(true);
              }}
              data-cta-category="navbar"
              data-cta-label="mobile_schedule_call"
              className="w-full mt-4 octa-button"
            >
              Schedule Call
            </CustomButton>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      {isSchedulerOpen && (
        <div
          className="fixed inset-0 z-[10020] flex items-center justify-center bg-[#020617]/80 px-4 py-6 backdrop-blur-sm"
          onClick={() => setIsSchedulerOpen(false)}
        >
          <div
            className="relative h-[min(88vh,860px)] w-full max-w-5xl overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#051629_0%,#03111f_100%)] shadow-[0_30px_120px_rgba(2,6,23,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative overflow-hidden border-b border-white/10 px-6 py-5">
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_45%)]" />
              <div className="relative flex items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                    Live Scheduling
                  </div>
                  <div className="text-xl font-semibold leading-tight text-white md:text-2xl">
                    Book a conversation with the OctaSense team
                  </div>
                  <div className="mt-2 max-w-xl text-sm leading-6 text-white/60">
                    Pick a time that works for you and we&apos;ll walk through
                    your infrastructure monitoring needs, deployment questions,
                    or pilot planning in one place.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSchedulerOpen(false)}
                  className="mt-1 rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                  aria-label="Close scheduler"
                >
                  <RiCloseFill size={20} />
                </button>
              </div>
            </div>

            <iframe
              src={embeddedCalcomUrl}
              title="Cal.com scheduling"
              className="h-[calc(100%-126px)] w-full bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}
