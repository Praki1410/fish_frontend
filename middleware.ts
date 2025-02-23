import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const userRole = request.cookies.get('userRole');

  // Public paths that don't require authentication
  if (request.nextUrl.pathname.startsWith('/auth/') || request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  // Check for authentication
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Admin routes protection
  if (request.nextUrl.pathname.startsWith('/admin/') && userRole?.value !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};