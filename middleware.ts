import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { AUTH_COOKIE_NAME, parseAuthSessionCookie } from '@/lib/auth/session';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const isAccessingAdmin = request.nextUrl.pathname.startsWith('/admin');
  const isAccessingLogin = request.nextUrl.pathname === '/login';

  // 1. Check local session cookie for Admin or SuperAdmin
  const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME);
  const localSession = parseAuthSessionCookie(sessionCookie?.value);

  let isAuthenticated = !!localSession;

  // 2. If not authenticated via local session cookie, check Supabase Auth
  if (!isAuthenticated && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet: any) {
              cookiesToSet.forEach(({ name, value }: any) => {
                request.cookies.set(name, value);
              });
              response = NextResponse.next({
                request: { headers: request.headers },
              });
              cookiesToSet.forEach(({ name, value, options }: any) => {
                response.cookies.set(name, value, options);
              });
            },
          },
        }
      );

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        isAuthenticated = true;
      }
    } catch {
      // Supabase unconfigured or offline
    }
  }

  // Guard /admin routes
  if (isAccessingAdmin && !isAuthenticated) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect authenticated user from /login to /admin
  if (isAccessingLogin && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
