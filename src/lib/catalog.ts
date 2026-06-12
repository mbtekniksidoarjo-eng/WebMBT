import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { products as fallbackProducts } from '@/data/products';
import type { Product } from '@/types/product';

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function fallbackWithSlug(p: Product) {
  return { ...p, slug: slugify(p.name) };
}

export type ProductWithSlug = Product & { slug: string };

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

function mapDbToProduct(p: DbProduct): ProductWithSlug {
  return {
    id: p.id,
    name: p.name,
    category: p.categories?.name || (p.phase === '1 Phase' ? 'Dinamo Motor 1 Phase' : p.phase === '3 Phase' ? 'Dinamo Motor 3 Phase' : 'Gear Box'),
    brand: p.brands?.name || 'Motology',
    image: p.image_url || '/images/logo.jpeg',
    phase: p.phase || undefined,
    rpm: p.rpm ? String(p.rpm) : undefined,
    capacityKw: p.capacity_kw ? `${p.capacity_kw} KW` : undefined,
    capacityHp: p.capacity_hp ? `${p.capacity_hp} HP` : undefined,
    mountingType: p.mounting_label || p.mounting_type || undefined,
    gearboxSize: p.gearbox_size ? String(p.gearbox_size) : undefined,
    gearboxRatio: p.gearbox_ratio ? String(p.gearbox_ratio) : undefined,
    gearboxType: p.gearbox_type || undefined,
    gearboxOutput: p.gearbox_output || undefined,
    description: p.short_description || p.description || 'Produk Maju Berkah Teknik.',
    slug: p.slug,
  };
}

export async function fetchAllProducts(): Promise<ProductWithSlug[]> {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackProducts.map(fallbackWithSlug);
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select(
        'id,name,slug,short_description,description,image_url,phase,rpm,capacity_kw,capacity_hp,mounting_type,mounting_label,gearbox_size,gearbox_ratio,gearbox_type,gearbox_output,is_featured,sort_order,categories(name),brands(name)'
      )
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('sort_order', { ascending: true });
    if (error) throw error;
    const rows = (data || []) as unknown as DbProduct[];
    if (!rows.length) return fallbackProducts.map(fallbackWithSlug);
    return rows.map(mapDbToProduct);
  } catch {
    return fallbackProducts.map(fallbackWithSlug);
  }
}

export async function fetchProductBySlug(slug: string): Promise<ProductWithSlug | null> {
  if (!isSupabaseConfigured || !supabase) {
    const match = fallbackProducts.find((p) => slugify(p.name) === slug);
    return match ? fallbackWithSlug(match) : null;
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select(
        'id,name,slug,short_description,description,image_url,phase,rpm,capacity_kw,capacity_hp,mounting_type,mounting_label,gearbox_size,gearbox_ratio,gearbox_type,gearbox_output,is_featured,sort_order,categories(name),brands(name)'
      )
      .eq('slug', slug)
      .eq('is_active', true)
      .single();
    if (error || !data) throw error;
    return mapDbToProduct(data as unknown as DbProduct);
  } catch {
    const match = fallbackProducts.find((p) => slugify(p.name) === slug);
    return match ? fallbackWithSlug(match) : null;
  }
}

export function generateWhatsAppForProduct(product: ProductWithSlug): string {
  return `Halo Maju Berkah Teknik, saya ingin bertanya tentang ${product.name} (${product.category}). Mohon info spesifikasi dan penawarannya.`;
}

export type CatalogFilter = {
  category?: string;
  brand?: string;
  phase?: string;
  gearboxType?: string;
  search?: string;
};

export function filterProducts(products: ProductWithSlug[], filter: CatalogFilter) {
  return products.filter((p) => {
    if (filter.category && p.category !== filter.category) return false;
    if (filter.brand && p.brand !== filter.brand) return false;
    if (filter.phase && p.phase !== filter.phase) return false;
    if (filter.gearboxType && p.gearboxType !== filter.gearboxType) return false;
    if (filter.search) {
      const q = filter.search.toLowerCase();
      const hay = [
        p.name,
        p.description,
        p.category,
        p.brand,
        p.phase,
        p.rpm,
        p.capacityKw,
        p.mountingType,
        p.gearboxType,
        p.gearboxOutput,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
