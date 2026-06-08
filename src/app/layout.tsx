import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Maju Berkah Teknik | Jual Dinamo Motor & Gear Box Industri',
  description:
    'Maju Berkah Teknik menyediakan dinamo motor 1 phase, 3 phase, dan gear box industri merk Motology dan Alliance. Konsultasi spesifikasi via WhatsApp.',
  keywords: ['dinamo motor', 'dinamo motor 3 phase', 'dinamo motor 1 phase', 'gear box', 'Motology', 'Alliance'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
