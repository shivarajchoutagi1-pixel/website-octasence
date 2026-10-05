import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OctaSense — Use Cases',
  description: 'AI-Powered Predictive Intelligence for Critical Infrastructure',
};

export default function UseCasesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
