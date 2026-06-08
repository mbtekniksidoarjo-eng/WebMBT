import { productCategories as fallbackCategories, products as fallbackProducts } from '@/data/products';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type { Product } from '@/types/product';

export type CmsCategory = {
  id?: string;
  title: string;
  description: string;
  image: string;
  specs: string[];
};

export type CmsFaq = {
  id?: string;
  question: string;
  answer: string;
  sort_order?: number;
};

export type CmsSetting = {
  key: string;
  value: string | null;
};

export type CmsContent = {
  key: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
  button_label: string | null;
  button_url: string | null;
};

type DbProduct = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  image_url: string | null;
  phase: '1 Phase' | '3 Phase' | null;
  rpm: number | null;
  capacity_kw: number | null;
  capacity_hp: number | null;
  mounting_type: string | null;
  mounting_label: string | null;
  gearbox_size: number | null;
  gearbox_ratio: number | null;
  gearbox_type: string | null;
  gearbox_output: string | null;
  is_featured: boolean;
  sort_order: number;
  categories: { name: Product['category'] } | null;
  brands: { name: Product['brand'] } | null;
};

export async function getCmsData() {
  if (!isSupabaseConfigured || !supabase) {
    return getFallbackCmsData('Supabase belum dikonfigurasi, memakai data lokal.');
  }

  try {
    const [categoriesRes, productsRes, faqsRes, settingsRes, contentsRes] = await Promise.all([
      supabase
        .from('categories')
        .select('id,name,description,image_url,sort_order')
        .eq('is_active', true)
        .order('sort_order', { ascending: true }),
      supabase
        .from('products')
        .select('id,name,slug,short_description,description,image_url,phase,rpm,capacity_kw,capacity_hp,mounting_type,mounting_label,gearbox_size,gearbox_ratio,gearbox_type,gearbox_output,is_featured,sort_order,categories(name),brands(name)')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('sort_order', { ascending: true })
        .limit(12),
      supabase
        .from('faqs')
        .select('id,question,answer,sort_order')
        .eq('is_active', true)
        .order('sort_order', { ascending: true }),
      supabase.from('settings').select('key,value'),
      supabase
        .from('site_contents')
        .select('key,title,subtitle,content,image_url,button_label,button_url')
        .eq('is_active', true),
    ]);

    const hasError = categoriesRes.error || productsRes.error || faqsRes.error || settingsRes.error || contentsRes.error;
    if (hasError) {
      return getFallbackCmsData(`Gagal membaca Supabase: ${hasError.message}`);
    }

    const categories = (categoriesRes.data || []).map((category) => ({
      id: category.id,
      title: category.name,
      description: category.description || '',
      image: category.image_url || '/images/logo.jpeg',
      specs: getCategorySpecs(category.name),
    }));

    const products = ((productsRes.data || []) as unknown as DbProduct[]).map(mapDbProductToProduct);

    return {
      source: 'supabase' as const,
      notice: null as string | null,
      categories: categories.length ? categories : fallbackCategories,
      products: products.length ? products : fallbackProducts,
      faqs: (faqsRes.data || []) as CmsFaq[],
      settings: (settingsRes.data || []) as CmsSetting[],
      contents: (contentsRes.data || []) as CmsContent[],
    };
  } catch (error) {
    return getFallbackCmsData(error instanceof Error ? error.message : 'Gagal membaca Supabase.');
  }
}

function getFallbackCmsData(notice: string) {
  return {
    source: 'fallback' as const,
    notice,
    categories: fallbackCategories,
    products: fallbackProducts,
    faqs: [
      {
        id: 'fallback-faq-1',
        question: 'Apakah bisa konsultasi spesifikasi sebelum membeli?',
        answer: 'Ya. Calon pelanggan dapat berkonsultasi melalui WhatsApp untuk menentukan phase, RPM, kapasitas, mounting, size, ratio, dan tipe produk yang sesuai.',
      },
      {
        id: 'fallback-faq-2',
        question: 'Apakah tersedia dinamo motor 1 phase dan 3 phase?',
        answer: 'Ya. Tersedia dinamo motor 1 phase dan 3 phase dengan pilihan merk Motology dan Alliance.',
      },
      {
        id: 'fallback-faq-3',
        question: 'Apakah tersedia gear box berbagai ratio?',
        answer: 'Ya. Gear box tersedia dengan pilihan ratio 10, 20, 30, 40, 50, dan 60.',
      },
    ] satisfies CmsFaq[],
    settings: [] as CmsSetting[],
    contents: [] as CmsContent[],
  };
}

function mapDbProductToProduct(product: DbProduct): Product {
  return {
    id: product.id,
    name: product.name,
    category: product.categories?.name || (product.phase === '1 Phase' ? 'Dinamo Motor 1 Phase' : product.phase === '3 Phase' ? 'Dinamo Motor 3 Phase' : 'Gear Box'),
    brand: product.brands?.name || 'Motology',
    image: product.image_url || '/images/logo.jpeg',
    phase: product.phase || undefined,
    rpm: product.rpm ? String(product.rpm) : undefined,
    capacityKw: product.capacity_kw ? `${product.capacity_kw} KW` : undefined,
    capacityHp: product.capacity_hp ? `${product.capacity_hp} HP` : undefined,
    mountingType: product.mounting_label || product.mounting_type || undefined,
    gearboxSize: product.gearbox_size ? String(product.gearbox_size) : undefined,
    gearboxRatio: product.gearbox_ratio ? String(product.gearbox_ratio) : undefined,
    gearboxType: product.gearbox_type || undefined,
    gearboxOutput: product.gearbox_output || undefined,
    description: product.short_description || product.description || 'Produk Maju Berkah Teknik.',
  };
}

function getCategorySpecs(name: string) {
  if (name.includes('3 Phase')) return ['RPM 3000, 1500, 1000, 750', '0,18 KW – 315 KW', '0,25 HP – 410 HP'];
  if (name.includes('1 Phase')) return ['RPM 3000, 1500', '0,18 KW – 4 KW', '0,25 HP – 5 HP'];
  return ['Size 50 – 250', 'Ratio 10 – 60', 'WPA, WPX, WPO'];
}

export function getContent(contents: CmsContent[], key: string) {
  return contents.find((content) => content.key === key);
}

export function getSetting(settings: CmsSetting[], key: string, fallback = '') {
  return settings.find((setting) => setting.key === key)?.value || fallback;
}
