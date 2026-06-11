export const siteConfig = {
  name: 'Maju Berkah Teknik',
  tagline: 'Supplier Dinamo Motor & Gear Box Industri',
  description:
    'Maju Berkah Teknik menyediakan dinamo motor 1 phase, 3 phase, dan gear box industri merk Motology dan Alliance untuk kebutuhan pabrik, workshop, produksi, dan maintenance.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mbdinamo.com/',
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Pondok Mutiara Blok AA no 6 Sidoarjo',
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'mbtekniksidoarjo@gmail.com',
  phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+6285337625233',
  logo: '/images/logo.jpeg',
  locale: 'id_ID',
};

export function absoluteUrl(path = '/') {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}
