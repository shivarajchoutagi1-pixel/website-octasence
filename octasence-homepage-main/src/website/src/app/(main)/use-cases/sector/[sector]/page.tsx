import { notFound } from 'next/navigation';

import UseCasesPageClient from '../../UseCasesPageClient';
import { getCaseStudies } from '../../data/sanityCaseStudies';
import { getSectorLabelFromSlug } from '../../data/sectorRoutes';

export default async function SectorUseCasesPage({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector } = await params;
  const lockedSector = getSectorLabelFromSlug(sector);

  if (!lockedSector) {
    notFound();
  }

  const caseStudies = await getCaseStudies();

  return (
    <UseCasesPageClient
      caseStudies={caseStudies}
      lockedSector={lockedSector}
      backHref="/applications-infrastructure-intelligence"
    />
  );
}
