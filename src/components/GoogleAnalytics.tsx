'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function GaPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as unknown as Record<string, unknown>).gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GaPageView />
    </Suspense>
  );
}
