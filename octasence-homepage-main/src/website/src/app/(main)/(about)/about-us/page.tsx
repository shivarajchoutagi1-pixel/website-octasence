import Image from 'next/image';
import Link from 'next/link';

import DownloadsRow from '@/components/layouts/Downloadsrow';
import { Button } from '@/components/ui/button';
import mainConfig from '@/configs/mainConfigs';
import WhatsAppButton from '@/components/WhatsAppButton';
import ChatbotWidget from '@/components/ChatbotWidget';
import Veterans from '@/components/Veterans';

type Founder = {
  name: string;
  role: string;
  linkedin: string;
  tagline: string;
  imageSrc: string;
};

const FOUNDERS: Founder[] = [
  {
    name: 'Shivaraj Choutagi',
    role: 'Founder & CEO',
    linkedin: 'https://www.linkedin.com/in/shivaraj-choutagi/',
    tagline: 'IIM-K | Ex-Cofounder Picake | Member MEAI & ICMM',
    imageSrc: '/assets/images/Shivraj.jpeg',
  },
  {
    name: 'Vasiliy Bezlyudnyy',
    role: 'Co-Founder · Product',
    linkedin: 'https://www.linkedin.com/in/vasiliy-bezlyudnyy-453565240/',
    tagline: 'TalTech | Product Owner FluxHub Estonia',
    imageSrc: '/assets/images/vesely.png',
  },
];



const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen text-slate-100 bg-[#070b1a] bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(59,130,246,0.18),transparent_50%),radial-gradient(ellipse_70%_50%_at_100%_15%,rgba(99,102,241,0.14),transparent_45%),linear-gradient(180deg,#070b1a_0%,#0a1024_50%,#080c18_100%)]">
      <WhatsAppButton />
      <ChatbotWidget />
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.2),_transparent_50%)]" />
        <div
          className={`${mainConfig.containerClass} px-4 py-20 md:py-28 relative z-10`}
        >
          <p className="octa-pill mb-6">About Octasence</p>
          <h1 className="octa-heading text-4xl md:text-5xl lg:text-6xl max-w-4xl">
            Agentic intelligence for the world&apos;s critical infrastructure
          </h1>
          <p className="octa-lead mt-6 max-w-3xl text-lg md:text-xl text-slate-300">
            Octasence builds AI-driven structural health monitoring and
            geotechnical intelligence so owners and operators move from reactive
            inspection to predictive risk orchestration—across mining, dams,
            tunnels, metros, and complex built environments.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              <Link href="/contact">Talk to us</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/careers">Careers</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        className={`${mainConfig.containerClass} px-4 py-16 md:py-24 space-y-12`}
      >
        <div className="max-w-3xl">
          <h2 className="octa-heading text-3xl md:text-4xl">Founders</h2>
          <p className="mt-3 text-slate-400">
            Leaders who combine infrastructure domain depth with AI, product,
            and global go-to-market experience.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FOUNDERS.map((f) => (
            <article
              key={f.name}
              className="octa-panel flex flex-col gap-5 rounded-3xl p-6 md:p-8"
            >
              <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
                <Image
                  src={f.imageSrc}
                  alt={f.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 280px"
                  priority={f.name === 'Shivaraj Choutagi'}
                />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white">{f.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-400/95 mt-1">
                  {f.role}
                </p>
                <p className="text-sm leading-relaxed text-slate-300 mt-3 flex-1">
                  {f.tagline}
                </p>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-category="about"
                  data-cta-label={`founder_linkedin_${f.name}`}
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 mt-4"
                >
                  LinkedIn profile →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      
      
      <DownloadsRow />

     <section className={`${mainConfig.containerClass} px-4 py-20 md:py-28`}>
  <div className="grid gap-8 md:gap-10 md:grid-cols-2">

    {/* ── Vision ── */}
    <div
      className="
        relative group rounded-3xl p-8 md:p-10
        border border-white/10
        bg-white/[0.02]
        backdrop-blur-xl
        overflow-hidden
        transition-all duration-500
        hover:scale-[1.02]
        hover:border-indigo-500/30
        hover:shadow-[0_20px_60px_rgba(79,70,229,0.25)]
      "
    >
      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-indigo-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition duration-700" />

      <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
        Vision
      </h2>

      <div className="h-1.5 w-16 bg-indigo-600 rounded-full mt-3 mb-6" />

      <p className="text-slate-300 leading-relaxed text-lg md:text-xl font-medium">
        To become the world’s most trusted{' '}
        <span className="text-white font-semibold">
          AI-driven infrastructure intelligence platform
        </span>
        , ensuring zero catastrophic failures across{' '}
        <span className="text-indigo-400 font-semibold">
          mining and civil engineering environments
        </span>.
      </p>
    </div>

    {/* ── Mission ── */}
    <div
      className="
        relative group rounded-3xl p-8 md:p-10
        border border-white/10
        bg-white/[0.02]
        backdrop-blur-xl
        overflow-hidden
        transition-all duration-500
        hover:scale-[1.02]
        hover:border-blue-500/30
        hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]
      "
    >
      {/* Glow */}
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-blue-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition duration-700" />

      <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
        Mission
      </h2>

      <div className="h-1.5 w-16 bg-blue-600 rounded-full mt-3 mb-6" />

      <p className="text-slate-300 text-lg md:text-xl mb-6">
        To empower infrastructure operators with:
      </p>

      <ul className="space-y-3 text-slate-300 text-base md:text-lg">
        {[
          'Real-time structural awareness',
          'Predictive early-warning intelligence',
          'Automated compliance & audit systems',
          'AI-driven decision support',
        ].map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="mt-2 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-slate-400 text-base md:text-lg leading-relaxed">
        Making infrastructure{' '}
        <span className="text-white font-semibold">
          safer, more resilient, and operationally efficient
        </span>{' '}
        — even in remote and harsh environments.
      </p>
    </div>

  </div>
</section>

    <Veterans/>

      <section className="border-t border-white/5 bg-gradient-to-b from-indigo-950/35 to-[#070b1a] py-16 md:py-24">
        <div
          className={`${mainConfig.containerClass} px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-8`}
        >
          <div>
            <h2 className="octa-heading text-2xl md:text-3xl">
              Ready to explore Octasence?
            </h2>
            <p className="mt-2 text-slate-400 max-w-xl">
              Whether you are deploying monitoring at scale or evaluating
              agentic workflows for your infrastructure program, we would like
              to hear from you.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-blue-600 text-white hover:bg-blue-500 shrink-0"
          >
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>

      
    </div>
  );
};

export default AboutPage;
