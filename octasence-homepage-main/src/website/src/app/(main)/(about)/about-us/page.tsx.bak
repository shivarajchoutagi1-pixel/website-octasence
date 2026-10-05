import Image from 'next/image';
import Link from 'next/link';

import PitchDeckDownload from '@/components/layouts/PitchDeckDownload';
import { Button } from '@/components/ui/button';
import mainConfig from '@/configs/mainConfigs';
import { IconLinkedin } from '@/lib/icons';

type Founder = {
  name: string;
  role: string;
  tagline: string;
  imageSrc: string;
  linkedin?: string;
};

const FOUNDERS: Founder[] = [
  {
    name: 'Shivaraj Choutagi',
    role: 'Founder & CEO',
    tagline:
      'Mining and AI leader turning field reality into predictive infrastructure intelligence.',
    imageSrc: '/assets/images/Shivraj.jpeg',
    linkedin: 'https://www.linkedin.com/in/shivaraj-choutagi/',
  },
  {
    name: 'Harsh Vardhan',
    role: 'Co-Founder & CTO',
    tagline:
      'Twenty years shipping agentic platforms—from PropTech to SHM—for mission-critical systems.',
    imageSrc: '/assets/images/WhatsApp Image 2026-03-23 at 17.20.20.jpeg',
    linkedin: 'https://www.linkedin.com/in/harsh-vardhan87/',
  },
  {
    name: 'Wolfgang Staufer',
    role: 'Co-Founder · Business Development',
    tagline:
      'Scales deep-tech ventures globally—engineering rigor with board-level commercial execution.',
    imageSrc: '/assets/images/wolfgang.jpeg',
    linkedin: 'https://www.linkedin.com/in/wstaufer/',
  },
  {
    name: 'Vasiliy Bezlyudnyy',
    role: 'Co-Founder · Product',
    tagline:
      'Product and analytics lead: from customer truth to KPIs, dashboards, and shipped features.',
    imageSrc: '/assets/images/vesely.png',
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
  {
    name: 'Aishwarya T.',
    role: 'Engineering',
    linkedin: 'https://www.linkedin.com/in/aishwarya-t/',
    tagline:
      'Builds scalable backend systems and data pipelines for real-time infrastructure monitoring.',
    initials: 'AT',
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

      <PitchDeckDownload href="/assets/OctaSence_Investor_Deck_2026.pdf" />

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
        <div className="grid gap-8 md:grid-cols-2">
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
              <div>
                <h3 className="text-xl font-bold text-white">{f.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-400/95 mt-1">
                  {f.role}
                </p>
                <p className="text-sm leading-relaxed text-slate-300 mt-3">
                  {f.tagline}
                </p>
                {f.linkedin && (
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 mt-3"
                  >
                    <IconLinkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
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

      {/* FAQ Section */}
      <section className="border-y border-white/5 bg-white/[0.02] py-16 md:py-24">
        <div className={`${mainConfig.containerClass} px-4 space-y-12`}>
          <div className="max-w-3xl">
            <h2 className="octa-heading text-3xl md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-slate-400">
              Common questions about Octasence, our technology, and how we help
              infrastructure teams.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="octa-panel rounded-2xl p-6 border-blue-500/10">
              <h3 className="text-xl font-semibold text-white mb-3">
                What does Octasence do?
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Octasence provides industrial-grade monitoring and intelligence
                for critical infrastructure. We unify sensors, AI models, and
                workflows to give operators real-time visibility into structural
                health, predict failures, and enable proactive maintenance.
              </p>
            </div>
            <div className="octa-panel rounded-2xl p-6 border-blue-500/10">
              <h3 className="text-xl font-semibold text-white mb-3">
                Which industries do you serve?
              </h3>
              <p className="text-slate-300 leading-relaxed">
                We serve infrastructure-intensive industries including mining,
                energy, transportation, construction, and utilities. Our
                platform is designed for any organization managing critical
                physical assets that require continuous monitoring and risk
                assessment.
              </p>
            </div>
            <div className="octa-panel rounded-2xl p-6 border-blue-500/10">
              <h3 className="text-xl font-semibold text-white mb-3">
                How does your AI technology work?
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Our agentic AI analyzes sensor data in real-time, detects
                anomalies, predicts potential failures, and recommends actions.
                It learns from historical patterns and adapts to each asset's
                unique behavior, providing actionable intelligence rather than
                just alerts.
              </p>
            </div>
            <div className="octa-panel rounded-2xl p-6 border-blue-500/10">
              <h3 className="text-xl font-semibold text-white mb-3">
                What types of sensors do you support?
              </h3>
              <p className="text-slate-300 leading-relaxed">
                We support a wide range of sensors including vibration, strain,
                tilt, temperature, acoustic, and environmental sensors. Our
                platform is sensor-agnostic and can integrate with existing
                monitoring systems through APIs and standard protocols.
              </p>
            </div>
            <div className="octa-panel rounded-2xl p-6 border-blue-500/10">
              <h3 className="text-xl font-semibold text-white mb-3">
                How quickly can we deploy Octasence?
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Deployment time varies based on complexity, but typical pilot
                deployments can be operational within weeks. Our team works
                closely with yours to ensure smooth integration with your
                existing infrastructure and workflows.
              </p>
            </div>
            <div className="octa-panel rounded-2xl p-6 border-blue-500/10">
              <h3 className="text-xl font-semibold text-white mb-3">
                Do you offer on-premise or cloud solutions?
              </h3>
              <p className="text-slate-300 leading-relaxed">
                We offer both cloud-based and on-premise deployment options. Our
                cloud platform provides scalability and automatic updates, while
                on-premise solutions meet strict data residency and security
                requirements for sensitive environments.
              </p>
            </div>
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
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
