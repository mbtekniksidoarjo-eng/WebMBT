import type { Metadata, Viewport } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Maju Berkah Teknik | Supplier Dinamo Motor & Gear Box Industri',
    template: '%s | Maju Berkah Teknik',
  },
  description: siteConfig.description,
  keywords: [
    'dinamo motor',
    'dinamo motor 3 phase',
    'dinamo motor 1 phase',
    'gear box industri',
    'gearbox WPA WPX WPO',
    'Motology',
    'Alliance',
    'supplier dinamo motor Sidoarjo',
    'Maju Berkah Teknik',
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: siteConfig.logo,
    apple: siteConfig.logo,
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: '/',
    siteName: siteConfig.name,
    title: 'Maju Berkah Teknik | Supplier Dinamo Motor & Gear Box Industri',
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.logo),
        width: 1200,
        height: 630,
        alt: 'Logo Maju Berkah Teknik',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maju Berkah Teknik | Supplier Dinamo Motor & Gear Box Industri',
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.logo)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Industrial Supplies',
  other: {
    'geo.region': 'ID-JI',
    'geo.placename': 'Sidoarjo',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
