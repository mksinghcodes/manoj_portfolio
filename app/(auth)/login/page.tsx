'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { loginAdmin } from '@/app/actions/auth';
import { ShieldCheck, Lock, User, Eye, EyeOff, Loader2, Sparkles, KeyRound, ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/admin';

  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [state, formAction, isPending] = useActionState(loginAdmin, null);

  const fillCredentials = (user: string, pass: string) => {
    setIdentifier(user);
    setPassword(pass);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-cyan-600/10 via-indigo-600/10 to-purple-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Return to Portfolio Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 backdrop-blur-md transition-all shadow-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Portfolio</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-black/80 relative z-10 space-y-6">
        {/* Header Emblem */}
        <div className="flex flex-col items-center text-center">
          <div className="p-3 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 rounded-2xl text-cyan-400 mb-3 shadow-lg shadow-cyan-950/50">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Cloud Control Plane</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Authenticate to manage verified credentials, keynote recordings, and event media
          </p>
        </div>

        {/* Error Notification */}
        {state?.error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
            {state.error}
          </div>
        )}

        {/* Login Form */}
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="identifier"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Admin or SuperAdmin"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-11 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 shadow-lg shadow-cyan-500/25 active:scale-[0.99]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Authorizing System Access...</span>
              </>
            ) : (
              <span>Sign In to Control Plane</span>
            )}
          </button>
        </form>

        {/* Quick Credentials Guide & Autofill Helper */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
            <span>Configured Access Roles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Admin Preset */}
            <button
              type="button"
              onClick={() => fillCredentials('Admin', 'Admin@12345')}
              className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-cyan-300">Admin</span>
                <span className="text-[10px] text-slate-500 group-hover:text-cyan-400 font-mono">Fill</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 font-mono">Admin@12345</div>
            </button>

            {/* SuperAdmin Preset */}
            <button
              type="button"
              onClick={() => fillCredentials('SuperAdmin', 'SuperAdmin@12345')}
              className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-indigo-300">SuperAdmin</span>
                <span className="text-[10px] text-slate-500 group-hover:text-indigo-400 font-mono">Fill</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 font-mono">SuperAdmin@12345</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
