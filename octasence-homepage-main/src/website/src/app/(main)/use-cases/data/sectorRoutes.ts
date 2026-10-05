export const SECTOR_ROUTE_MAP = {
  mining: 'Mining',
  'oil-gas': 'Oil & Gas',
  tunnels: 'Tunnels',
  dams: 'Dams',
  'multi-domain': 'Multi-Domain',
} as const;

export type SectorSlug = keyof typeof SECTOR_ROUTE_MAP;

export const SECTOR_LABELS = ['All', ...Object.values(SECTOR_ROUTE_MAP)] as const;

export function getSectorLabelFromSlug(
  slug: string,
): (typeof SECTOR_ROUTE_MAP)[SectorSlug] | null {
  return SECTOR_ROUTE_MAP[slug as SectorSlug] ?? null;
}

export function getSectorSlug(label: string): SectorSlug | null {
  const match = Object.entries(SECTOR_ROUTE_MAP).find(
    ([, mappedLabel]) => mappedLabel === label,
  );

  return (match?.[0] as SectorSlug | undefined) ?? null;
}
