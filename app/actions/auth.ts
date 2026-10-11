'use server';

import { createClient } from '@/lib/supabase/server';
import { AUTH_COOKIE_NAME, AuthSession } from '@/lib/auth/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const LoginSchema = z.object({
  identifier: z.string().min(1, 'Username or Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function loginAdmin(prevState: any, formData: FormData) {
  const identifier = ((formData.get('identifier') || formData.get('email')) as string)?.trim();
  const password = (formData.get('password') as string)?.trim();
  const redirectTo = (formData.get('redirectTo') as string) || '/admin';

  const validated = LoginSchema.safeParse({ identifier, password });
  if (!validated.success) {
    return { error: validated.error.errors[0].message };
  }

  const idLower = validated.data.identifier.toLowerCase();
  const pass = validated.data.password;

  // 1. CMS Management Panel User: SuperAdmin (Password: SuperAdmin@12345)
  if ((idLower === 'superadmin' || idLower === 'superadmin@mksingh.cloud') && pass === 'SuperAdmin@12345') {
    const sessionData: AuthSession = {
      username: 'SuperAdmin',
      role: 'SuperAdmin',
      email: 'superadmin@mksingh.cloud',
      loggedInAt: Date.now(),
    };

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, Buffer.from(JSON.stringify(sessionData)).toString('base64'), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    redirect(redirectTo);
  }

  // 2. Admin Authentication: Admin (Password: Admin@12345)
  if ((idLower === 'admin' || idLower === 'admin@mksingh.cloud') && pass === 'Admin@12345') {
    const sessionData: AuthSession = {
      username: 'Admin',
      role: 'Admin',
      email: 'admin@mksingh.cloud',
      loggedInAt: Date.now(),
    };

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, Buffer.from(JSON.stringify(sessionData)).toString('base64'), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    redirect(redirectTo);
  }

  // 3. Fallback: Authenticate via Supabase Auth if project credentials configured
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: validated.data.identifier,
      password: validated.data.password,
    });

    if (!error) {
      redirect(redirectTo);
    }
  } catch {
    // Supabase auth service unavailable or offline
  }

  return { error: 'Invalid username or password. Please verify your credentials.' };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);

  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Ignore sign-out error
  }

  redirect('/login');
}
