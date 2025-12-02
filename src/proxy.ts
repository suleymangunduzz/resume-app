import createIntlMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createIntlMiddleware(routing);

function isProtectedRoute(pathname: string) {
  const withoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/)/, '');
  return withoutLocale.startsWith('/admin/dashboard');
}

export default function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // 1. Run next-intl middleware
  const intlResponse = intlMiddleware(req);

  // 2. AUTH CHECK (no mutation of req)
  if (isProtectedRoute(pathname)) {
    const token = req.cookies.get('admin_token');

    if (!token) {
      const url = new URL(req.url);

      // Extract locale from pathname safely
      const locale = url.pathname.split('/')[1];

      url.pathname = `/${locale}/admin/login`;
      return NextResponse.redirect(url);
    }
  }

  // 3. If next-intl returned a response, use it
  if (intlResponse) return intlResponse;

  // 4. Otherwise continue normally
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
