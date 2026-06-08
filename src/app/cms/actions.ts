'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { clearCmsAuthCookie, requireCmsAuth, setCmsAuthCookie, validateCmsPassword } from '@/lib/cms-auth';
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase-admin';

function value(formData: FormData, key: string) {
  const raw = formData.get(key);
  return typeof raw === 'string' ? raw.trim() : '';
}

function nullable(formData: FormData, key: string) {
  const data = value(formData, key);
  return data === '' ? null : data;
}

function numberOrNull(formData: FormData, key: string) {
  const data = value(formData, key);
  return data === '' ? null : Number(data);
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === 'on' || formData.get(key) === 'true';
}

function ensureAdminClient() {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    throw new Error('Supabase admin belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env.local.');
  }
  return supabaseAdmin;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function loginCms(formData: FormData) {
  const password = value(formData, 'password');
  if (!validateCmsPassword(password)) {
    redirect('/cms/login?error=1');
  }
  await setCmsAuthCookie();
  redirect('/cms');
}

export async function logoutCms() {
  await clearCmsAuthCookie();
  redirect('/cms/login');
}

export async function upsertCategory(formData: FormData) {
  await requireCmsAuth();
  const client = ensureAdminClient();
  const id = value(formData, 'id');
  const name = value(formData, 'name');
  const payload = {
    name,
    slug: value(formData, 'slug') || slugify(name),
    description: nullable(formData, 'description'),
    image_url: nullable(formData, 'image_url'),
    sort_order: Number(value(formData, 'sort_order') || 0),
    is_active: bool(formData, 'is_active'),
  };
  const query = id ? client.from('categories').update(payload).eq('id', id) : client.from('categories').insert(payload);
  const { error } = await query;
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/cms');
  revalidatePath('/cms/categories');
  redirect('/cms/categories');
}

export async function deleteCategory(formData: FormData) {
  await requireCmsAuth();
  const client = ensureAdminClient();
  const id = value(formData, 'id');
  const { error } = await client.from('categories').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/cms/categories');
}

export async function upsertBrand(formData: FormData) {
  await requireCmsAuth();
  const client = ensureAdminClient();
  const id = value(formData, 'id');
  const name = value(formData, 'name');
  const payload = {
    name,
    slug: value(formData, 'slug') || slugify(name),
    logo_url: nullable(formData, 'logo_url'),
    description: nullable(formData, 'description'),
    is_active: bool(formData, 'is_active'),
  };
  const query = id ? client.from('brands').update(payload).eq('id', id) : client.from('brands').insert(payload);
  const { error } = await query;
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/cms/brands');
  redirect('/cms/brands');
}

export async function deleteBrand(formData: FormData) {
  await requireCmsAuth();
  const client = ensureAdminClient();
  const id = value(formData, 'id');
  const { error } = await client.from('brands').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/cms/brands');
}

export async function upsertProduct(formData: FormData) {
  await requireCmsAuth();
  const client = ensureAdminClient();
  const id = value(formData, 'id');
  const name = value(formData, 'name');
  const payload = {
    category_id: nullable(formData, 'category_id'),
    brand_id: nullable(formData, 'brand_id'),
    name,
    slug: value(formData, 'slug') || slugify(name),
    sku: nullable(formData, 'sku'),
    short_description: nullable(formData, 'short_description'),
    description: nullable(formData, 'description'),
    image_url: nullable(formData, 'image_url'),
    phase: nullable(formData, 'phase'),
    rpm: numberOrNull(formData, 'rpm'),
    capacity_kw: numberOrNull(formData, 'capacity_kw'),
    capacity_hp: numberOrNull(formData, 'capacity_hp'),
    mounting_type: nullable(formData, 'mounting_type'),
    mounting_label: nullable(formData, 'mounting_label'),
    gearbox_size: numberOrNull(formData, 'gearbox_size'),
    gearbox_ratio: numberOrNull(formData, 'gearbox_ratio'),
    gearbox_type: nullable(formData, 'gearbox_type'),
    gearbox_output: nullable(formData, 'gearbox_output'),
    price: numberOrNull(formData, 'price'),
    price_note: value(formData, 'price_note') || 'Hubungi kami untuk penawaran harga',
    stock_status: value(formData, 'stock_status') || 'available',
    is_featured: bool(formData, 'is_featured'),
    is_active: bool(formData, 'is_active'),
    sort_order: Number(value(formData, 'sort_order') || 0),
    seo_title: nullable(formData, 'seo_title'),
    seo_description: nullable(formData, 'seo_description'),
  };
  const query = id ? client.from('products').update(payload).eq('id', id) : client.from('products').insert(payload);
  const { error } = await query;
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/cms');
  revalidatePath('/cms/products');
  redirect('/cms/products');
}

export async function deleteProduct(formData: FormData) {
  await requireCmsAuth();
  const client = ensureAdminClient();
  const id = value(formData, 'id');
  const { error } = await client.from('products').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/cms/products');
}

export async function upsertFaq(formData: FormData) {
  await requireCmsAuth();
  const client = ensureAdminClient();
  const id = value(formData, 'id');
  const payload = {
    question: value(formData, 'question'),
    answer: value(formData, 'answer'),
    sort_order: Number(value(formData, 'sort_order') || 0),
    is_active: bool(formData, 'is_active'),
  };
  const query = id ? client.from('faqs').update(payload).eq('id', id) : client.from('faqs').insert(payload);
  const { error } = await query;
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/cms/faqs');
  redirect('/cms/faqs');
}

export async function deleteFaq(formData: FormData) {
  await requireCmsAuth();
  const client = ensureAdminClient();
  const id = value(formData, 'id');
  const { error } = await client.from('faqs').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/cms/faqs');
}

export async function upsertSetting(formData: FormData) {
  await requireCmsAuth();
  const client = ensureAdminClient();
  const id = value(formData, 'id');
  const payload = {
    key: value(formData, 'key'),
    value: nullable(formData, 'value'),
    description: nullable(formData, 'description'),
  };
  const query = id ? client.from('settings').update(payload).eq('id', id) : client.from('settings').insert(payload);
  const { error } = await query;
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/cms/settings');
  redirect('/cms/settings');
}

export async function deleteSetting(formData: FormData) {
  await requireCmsAuth();
  const client = ensureAdminClient();
  const id = value(formData, 'id');
  const { error } = await client.from('settings').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/cms/settings');
}
