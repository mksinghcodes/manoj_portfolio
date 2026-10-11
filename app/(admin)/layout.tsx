import { ReactNode } from 'react';
import { createClient } from '@/lib/supabase/server';
import { getAuthSession } from '@/lib/auth/session';
import { logoutAdmin } from '@/app/actions/auth';
import { ShieldCheck, LogOut, ExternalLink, Crown, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const localSession = await getAuthSession();
  let supabaseUser = null;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    supabaseUser = user;
  } catch {
    // Supabase unavailable or using local session
  }

  const isSuperAdmin = localSession?.role === 'SuperAdmin';
  const displayName = localSession?.username || supabaseUser?.email || 'Admin';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${
              isSuperAdmin 
                ? 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-400' 
                : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
            }`}>
              {isSuperAdmin ? <Crown className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wide text-white">
                {isSuperAdmin ? 'CMS Master Control' : 'Portfolio Control Plane'}
              </span>
              <span className={`hidden sm:inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-mono font-semibold ${
                isSuperAdmin 
                  ? 'bg-indigo-950/80 border border-indigo-500/40 text-indigo-300' 
                  : 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300'
              }`}>
                {isSuperAdmin ? <Crown className="w-3 h-3 text-indigo-400" /> : <UserCheck className="w-3 h-3 text-cyan-400" />}
                <span>{displayName}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 transition-colors"
            >
              Public Site <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-900/40 bg-rose-950/20 hover:bg-rose-900/40 text-rose-300 text-xs transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
