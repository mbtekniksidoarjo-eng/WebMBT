import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CMS Admin',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CmsRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
