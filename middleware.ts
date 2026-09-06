import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

const publicRoutes = ['/auth/login', '/auth/register', '/'];
const protectedRoutes = ['/dashboard', '/profile', '/settings', '/onboarding'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth();

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect authenticated users away from auth pages
  if (session && (pathname.startsWith('/auth') || pathname === '/')) {
    return Response.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users to login
  if (!session && isProtectedRoute) {
    return Response.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
