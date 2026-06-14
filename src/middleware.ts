import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('careerflyghtToken')?.value;
  const userStr = request.cookies.get('careerflyghtUser')?.value;
  let user = null;

  if (userStr) {
    try {
      user = JSON.parse(decodeURIComponent(userStr));
    } catch (e) {
      console.error("Failed to parse user from cookie", e);
    }
  }

  const { pathname } = request.nextUrl;

  // Define route patterns
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isStudentRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/mentors') || pathname.startsWith('/bookings');
  const isMentorRoute = pathname.startsWith('/mentor');
  const isAdminRoute = pathname.startsWith('/admin');

  // Redirect if not authenticated
  if (!token && (isStudentRoute || isMentorRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect if authenticated and trying to access auth routes
  if (token && isAuthRoute) {
    if (user?.role === 'mentor') {
      return NextResponse.redirect(new URL('/mentor/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Role-based access control
  if (token && user) {
    if (isMentorRoute && user.role !== 'mentor' && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (isStudentRoute && user.role === 'mentor' && !pathname.startsWith('/mentors')) {
       return NextResponse.redirect(new URL('/mentor/dashboard', request.url));
    }

    if (isAdminRoute && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/mentor/:path*',
    '/admin/:path*',
    '/mentors/:path*',
    '/bookings/:path*',
    '/login',
    '/signup',
  ],
};
