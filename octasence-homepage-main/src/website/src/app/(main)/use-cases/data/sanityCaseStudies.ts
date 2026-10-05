import 'server-only';

import { caseStudies, type CaseStudy } from './caseStudies';

const SANITY_PROJECT_ID = 'h3s6cqpv';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2023-10-01';
const SANITY_QUERY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;
const DEFAULT_HERO_COLOR = '#0f172a';

type SanityCaseStudy = {
  slug?: string;
  tag?: string;
  sector?: string;
  title?: string;
  subtitle?: string;
  summary?: string;
  background?: string;
  heroColor?: string;
  image?: string;
  sensorDeployment?: Array<{ name?: string; detail?: string }>;
  outcomes?: string[];
  stats?: Array<{ value?: string; label?: string }>;
  deploymentSnapshot?: Array<{ label?: string; value?: string }>;
};

type SanityQueryResponse<T> = {
  result?: T;
};

const CASE_STUDIES_QUERY = `
  *[_type == "caseStudy"] | order(_createdAt asc) {
    "slug": slug.current,
    tag,
    sector,
    title,
    subtitle,
    summary,
    background,
    heroColor,
    "image": image.asset->url,
    sensorDeployment[]{
      name,
      detail
    },
    outcomes,
    stats[]{
      value,
      label
    },
    deploymentSnapshot[]{
      label,
      value
    }
  }
`;

function formatSanityLabel(
  value: string | undefined,
  fallback: string,
): string {
  if (!value) return fallback;

  const normalized = value.trim().toLowerCase();
  const labelMap: Record<string, string> = {
    mining: 'Mining',
    dams: 'Dams',
    tunnels: 'Tunnels',
    'oil-gas': 'Oil & Gas',
    'multi-domain': 'Multi-Domain',
  };

  return labelMap[normalized] ?? fallback;
}

function mapSanityCaseStudy(
  study: SanityCaseStudy,
  index: number,
): CaseStudy | null {
  if (!study.slug || !study.title || !study.summary) {
    return null;
  }

  return {
    id: study.slug,
    number: index + 1,
    tag: formatSanityLabel(study.tag, 'General'),
    sector: formatSanityLabel(
      study.sector,
      formatSanityLabel(study.tag, 'General'),
    ),
    title: study.title,
    subtitle: study.subtitle ?? '',
    summary: study.summary,
    heroColor: study.heroColor ?? DEFAULT_HERO_COLOR,
    image: study.image ?? '',
    background: study.background ?? '',
    sensorDeployment: (study.sensorDeployment ?? [])
      .filter((item) => item?.name && item?.detail)
      .map((item) => ({
        name: item.name as string,
        detail: item.detail as string,
      })),
    outcomes: (study.outcomes ?? []).filter(Boolean),
    stats:
      study.stats
        ?.filter((item) => item?.value && item?.label)
        .map((item) => ({
          value: item.value as string,
          label: item.label as string,
        })) ?? [],
    deploymentSnapshot:
      study.deploymentSnapshot
        ?.filter((item) => item?.label && item?.value)
        .map((item) => ({
          label: item.label as string,
          value: item.value as string,
        })) ?? [],
  };
}

async function fetchFromSanity<T>(query: string): Promise<T> {
  const url = new URL(SANITY_QUERY_URL);
  url.searchParams.set('query', query);

  const response = await fetch(url.toString(), {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Sanity query failed with status ${response.status}`);
  }

  const data = (await response.json()) as SanityQueryResponse<T>;
  return (data.result ?? []) as T;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const studies =
      await fetchFromSanity<SanityCaseStudy[]>(CASE_STUDIES_QUERY);
    const mapped = studies
      .map((study, index) => mapSanityCaseStudy(study, index))
      .filter((study): study is CaseStudy => study !== null);

    return mapped.length > 0 ? mapped : caseStudies;
  } catch {
    return caseStudies;
  }
}

export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  const studies = await getCaseStudies();
  return studies.find((study) => study.id === id) ?? null;
}

export async function getCaseStudyIds(): Promise<string[]> {
  const studies = await getCaseStudies();
  return studies.map((study) => study.id);
}
