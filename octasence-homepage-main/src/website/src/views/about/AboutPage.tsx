import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import mainConfig from '@/configs/mainConfigs';

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
    tagline:
      'Mining and AI leader turning field reality into predictive infrastructure intelligence.',
    imageSrc: '/assets/images/Shivraj.jpeg',
  },
  {
    name: 'Harsh Vardhan',
    role: 'Co-Founder & CTO',
    linkedin: 'https://www.linkedin.com/in/harsh-vardhan87/',
    tagline:
      'Twenty years shipping agentic platforms—from PropTech to SHM—for mission-critical systems.',
    imageSrc: '/assets/images/WhatsApp Image 2026-03-13 at 17.11.13.jpeg',
  },
  {
    name: 'Wolfgang Staufer',
    role: 'Co-Founder · Business Development',
    linkedin: 'https://www.linkedin.com/in/wstaufer/?locale=en',
    tagline:
      'Scales deep-tech ventures globally—engineering rigor with board-level commercial execution.',
    imageSrc: '/assets/images/wolfgang.jpeg',
  },
  {
    name: 'Vasiliy Bezlyudnyy',
    role: 'Co-Founder · Product',
    linkedin: 'https://www.linkedin.com/in/vasiliy-bezlyudnyy-453565240/',
    tagline:
      'Product and analytics lead: from customer truth to KPIs, dashboards, and shipped features.',
    imageSrc: '/assets/images/vesely.png',
  },
  {
    name: 'Maulesh Varma',
    role: 'Co-Founder · Business Planning',
    linkedin: 'https://www.linkedin.com/in/maulesh-varma-a43a1b48/',
    tagline:
      'Leading client partnerships and strategic business planning to provide enterprise growth.',
    imageSrc: '/assets/images/maulesh.jpeg',
  },
];

type TeamMember = {
  name: string;
  role: string;
  linkedin: string;
  tagline: string;
  initials: string;
};

const TEAM: TeamMember[] = [
  {
    name: 'Sandeep Vissapragada',
    role: 'Strategy & partnerships',
    linkedin:
      'https://www.linkedin.com/in/sandeep-vissapragada-10b09b24a?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    tagline:
      'Aligns enterprise programs with Octasence roadmaps so deployments land on time.',
    initials: 'SV',
  },
  {
    name: 'Hovarthan S.',
    role: 'Software engineering',
    linkedin:
      'https://www.linkedin.com/in/hovarthan-s-06114b281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    tagline:
      'Builds resilient ingestion and APIs that keep field data trustworthy at scale.',
    initials: 'HS',
  },
  {
    name: 'Akshay Mali',
    role: 'Product engineering',
    linkedin: 'https://www.linkedin.com/in/akshay-mali-333129246/',
    tagline:
      'Connects UX and telemetry so operators see risk—not noise—on every screen.',
    initials: 'AM',
  },
  {
    name: 'Prashant Paliwal',
    role: 'Operations',
    linkedin:
      'https://www.linkedin.com/in/prashant-paliwal-39914726a/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    tagline:
      'Keeps delivery, vendors, and customer success moving as one rhythm.',
    initials: 'PP',
  },
  {
    name: 'Devanshi Jaiswal',
    role: 'Design & experience',
    linkedin:
      'https://www.linkedin.com/in/devanshi-jaiswal-b83774217/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    tagline:
      'Shapes interfaces and narratives so complex SHM feels obvious to real users.',
    initials: 'DJ',
  },
];

function TeamAvatar({
  initials,
  className = '',
}: {
  initials: string;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-square w-full max-w-[160px] items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/35 to-sky-500/20 text-xl font-black text-white/90 ${className}`}
    >
      {initials}
    </div>
  );
}

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen text-slate-100 bg-[#070b1a] bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(59,130,246,0.18),transparent_50%),radial-gradient(ellipse_70%_50%_at_100%_15%,rgba(99,102,241,0.14),transparent_45%),linear-gradient(180deg,#070b1a_0%,#0a1024_50%,#080c18_100%)]">
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
              <Link
                href="/contact"
                data-cta-category="about"
                data-cta-label="hero_talk_to_us"
              >
                Talk to us
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <Link
                href="/careers"
                data-cta-category="about"
                data-cta-label="hero_careers"
              >
                Careers
              </Link>
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

      <section className="border-y border-white/5 bg-white/[0.02] py-16 md:py-24">
        <div className={`${mainConfig.containerClass} px-4 space-y-12`}>
          <div className="max-w-3xl">
            <h2 className="octa-heading text-3xl md:text-4xl">Team</h2>
            <p className="mt-3 text-slate-400">
              The people behind the product—shipping, supporting, and refining
              Octasence with customers in the field.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <article
                key={m.name}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0a1024]/85 p-6"
              >
                <TeamAvatar initials={m.initials} />
                <div>
                  <h3 className="text-lg font-semibold text-white">{m.name}</h3>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mt-0.5">
                    {m.role}
                  </p>
                </div>
                <p className="text-sm text-slate-300 flex-1 leading-relaxed">
                  {m.tagline}
                </p>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-category="about"
                  data-cta-label={`team_linkedin_${m.name}`}
                  className="text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                  LinkedIn profile →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${mainConfig.containerClass} px-4 py-16 md:py-24`}>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="octa-panel rounded-3xl p-8 md:p-10 border-blue-500/10">
            <h2 className="octa-heading text-2xl md:text-3xl">Vision</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              A world where every critical structure is understood in real
              time—where risk is visible before failure, and operators act with
              confidence backed by agentic AI and trusted data.
            </p>
          </div>
          <div className="octa-panel rounded-3xl p-8 md:p-10 border-blue-500/10">
            <h2 className="octa-heading text-2xl md:text-3xl">Mission</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Deliver industrial-grade monitoring and intelligence that unifies
              sensors, models, and workflows—so teams can prevent the
              unthinkable and keep communities and assets safe.
            </p>
          </div>
        </div>
      </section>

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
            <Link
              href="/contact"
              data-cta-category="about"
              data-cta-label="bottom_get_in_touch"
            >
              Get in touch
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
