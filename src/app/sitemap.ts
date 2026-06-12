import type { MetadataRoute } from 'next';
import { fetchAllProducts } from '@/lib/catalog';
import { absoluteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const products = await fetchAllProducts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/produk'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/kategori'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const productPages = products.map((p) => ({
    url: absoluteUrl(`/produk/${p.slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7 as const,
  }));

  return [...staticPages, ...productPages];
}
