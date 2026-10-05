import { notFound } from 'next/navigation';

import { getCaseStudyById, getCaseStudyIds } from '../data/sanityCaseStudies';
import CaseStudyDetail from './CaseStudyDetail';

export async function generateStaticParams() {
  const ids = await getCaseStudyIds();
  return ids.map((id) => ({ id }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cs = await getCaseStudyById(id);
  if (!cs) notFound();
  return <CaseStudyDetail cs={cs} />;
}
