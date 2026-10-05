import { getCaseStudies } from './data/sanityCaseStudies';
import UseCasesPageClient from './UseCasesPageClient';

export default async function UseCasesPage() {
  const caseStudies = await getCaseStudies();

  return <UseCasesPageClient caseStudies={caseStudies} />;
}
