import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vizcaia — A foundry for intelligence',
  description:
    'We build AI agents and automations for US mid-market companies. Production-grade, not demos.',
  metadataBase: new URL('https://vizcaia.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
