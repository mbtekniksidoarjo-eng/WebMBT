import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'mbt_cms_session';
const SESSION_VALUE = 'authenticated';

export async function isCmsAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === SESSION_VALUE;
}

export async function requireCmsAuth() {
  const authenticated = await isCmsAuthenticated();
  if (!authenticated) redirect('/cms/login');
}

export async function setCmsAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, SESSION_VALUE, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
}

export async function clearCmsAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function validateCmsPassword(password: string) {
  const expectedPassword = process.env.CMS_ADMIN_PASSWORD;
  return Boolean(expectedPassword && password === expectedPassword);
}
