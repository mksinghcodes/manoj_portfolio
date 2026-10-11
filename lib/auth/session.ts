import { cookies } from 'next/headers';

export interface AuthSession {
  username: string;
  role: 'Admin' | 'SuperAdmin';
  email: string;
  loggedInAt: number;
}

export const AUTH_COOKIE_NAME = 'portfolio_auth_session';

export async function getAuthSession(): Promise<AuthSession | null> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(AUTH_COOKIE_NAME);
    if (!cookie?.value) return null;

    const decoded = Buffer.from(cookie.value, 'base64').toString('utf-8');
    const session = JSON.parse(decoded) as AuthSession;
    if (session && (session.role === 'Admin' || session.role === 'SuperAdmin')) {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

export function parseAuthSessionCookie(cookieValue?: string): AuthSession | null {
  if (!cookieValue) return null;
  try {
    const decoded = Buffer.from(cookieValue, 'base64').toString('utf-8');
    const session = JSON.parse(decoded) as AuthSession;
    if (session && (session.role === 'Admin' || session.role === 'SuperAdmin')) {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}
