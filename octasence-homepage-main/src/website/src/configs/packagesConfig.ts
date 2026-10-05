// Package configuration with real npm statistics
export interface Package {
  id: string;
  name: string;
  displayName: string;
  description: string;
  tagline?: string;
  version: string;
  weeklyDownloads: string;
  totalDownloads: string;
  iconCount: number;
  categories: number;
  frameworks: Array<{
    name: 'React' | 'Vue' | 'Flutter';
    package: string;
    displayName: string;
    icon: string;
    installCommand: string;
  }>;
  features: string[];
  repository: string;
  homepage: string;
  npmPackage: string;
  docsUrl: string;
  bundleSize: string;
  license: string;
  lastPublished: string;
  treeshakeable: boolean;
  typescript: boolean;
  ssr: boolean;
}

export const packagesData: Package[] = [
  {
    id: 'icons',
    name: 'icons',
    displayName: 'Lucide Icons',
    description:
      'Beautiful & consistent icon library with 1,000+ icons. Available for React, Vue, and Flutter with full TypeScript support.',
    tagline: 'Beautiful icons for your projects',
    // TODO: These metrics should be fetched from npm registry API at build time to stay current
    version: '0.0.0',
    weeklyDownloads: '0',
    totalDownloads: '0',
    iconCount: 1000,
    categories: 20,
    frameworks: [
      {
        name: 'React',
        package: 'lucide-react',
        displayName: 'React',
        icon: 'react',
        installCommand: 'npm install lucide-react',
      },
      {
        name: 'Vue',
        package: 'lucide-vue',
        displayName: 'Vue 3',
        icon: 'vue',
        installCommand: 'npm install lucide-vue',
      },
      {
        name: 'Flutter',
        package: 'lucide_flutter',
        displayName: 'Flutter',
        icon: 'flutter',
        installCommand: 'flutter pub add lucide_flutter',
      },
    ],
    features: [
      '1,000+ carefully crafted icons',
      'Tree-shakable',
      'Full TypeScript support',
      'SSR compatible',
      'Multiple categories',
      'Zero dependencies',
    ],
    repository: 'https://github.com/lucide-icons/lucide',
    homepage: 'https://lucide.dev',
    npmPackage: 'https://www.npmjs.com/package/lucide-react',
    docsUrl: 'https://lucide.dev/docs',
    bundleSize: '~15 MB unpacked, tree-shakeable',
    license: 'MIT',
    lastPublished: '6 months ago',
    treeshakeable: true,
    typescript: true,
    ssr: true,
  },
];

export const getPackageById = (id: string): Package | undefined =>
  packagesData.find((pkg) => pkg.id === id);
export const getAllPackages = (): Package[] => packagesData;
