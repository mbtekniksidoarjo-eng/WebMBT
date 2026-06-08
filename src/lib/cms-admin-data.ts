import { requireCmsAuth } from '@/lib/cms-auth';
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase-admin';

export async function getAdminClientOrNull() {
  await requireCmsAuth();
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return null;
  return supabaseAdmin;
}

export async function fetchAdminTable(table: string, orderBy = 'sort_order') {
  const client = await getAdminClientOrNull();
  if (!client) return { data: [], error: 'Supabase admin belum dikonfigurasi.' };
  const { data, error } = await client.from(table).select('*').order(orderBy, { ascending: true });
  return { data: data || [], error: error?.message || null };
}

export async function fetchProductAdminData() {
  const client = await getAdminClientOrNull();
  if (!client) return { products: [], categories: [], brands: [], error: 'Supabase admin belum dikonfigurasi.' };
  const [productsRes, categoriesRes, brandsRes] = await Promise.all([
    client.from('products').select('*,categories(name),brands(name)').order('sort_order', { ascending: true }).limit(200),
    client.from('categories').select('*').order('sort_order', { ascending: true }),
    client.from('brands').select('*').order('name', { ascending: true }),
  ]);
  const error = productsRes.error?.message || categoriesRes.error?.message || brandsRes.error?.message || null;
  return {
    products: productsRes.data || [],
    categories: categoriesRes.data || [],
    brands: brandsRes.data || [],
    error,
  };
}
