'use client';

import { useState } from 'react';
import { 
  Terminal, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  Youtube, 
  Mail, 
  ShieldCheck, 
  Cpu, 
  Server, 
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const [copied, setCopied] = useState(false);
  const cliCommand = 'npx mksingh-portfolio --connect';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-900 text-slate-400 overflow-hidden pt-16 pb-12">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Top Interactive Row: Call-to-action & CLI Terminal Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Enterprise Architecture Consultation
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to architect resilient cloud infrastructure?
            </h3>
            <p className="text-sm text-slate-300/80 max-w-lg leading-relaxed">
              Available for advisory engagements, cloud migration reviews, 
              and enterprise infrastructure hardening across Google Cloud, Kubernetes, and AI pipelines.
            </p>
          </div>

          {/* Interactive CLI Badge */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Developer Quick Connect (CLI)
            </span>
            <div className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 shadow-inner">
              <div className="flex items-center gap-2 truncate">
                <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{cliCommand}</span>
              </div>
              <button
                onClick={copyToClipboard}
                aria-label="Copy CLI command"
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-white transition-all shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            {copied && (
              <span className="text-[11px] text-emerald-400 mt-1 font-mono">
                ✓ Command copied to clipboard
              </span>
            )}
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4">
          {/* Col 1: About */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Architect Focus</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Enterprise Cloud Strategy</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Zero-Trust Network Security</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Applied AI & Agent Systems</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">L3 Infrastructure Resiliency</span></li>
            </ul>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Portfolio Hub</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#certifications" className="hover:text-cyan-400 transition-colors">Verified Credentials</Link></li>
              <li><Link href="#videos" className="hover:text-cyan-400 transition-colors">Recorded Keynotes & Talks</Link></li>
              <li><Link href="#gallery" className="hover:text-cyan-400 transition-colors">Seminar Photos</Link></li>
              <li><Link href="/admin" className="hover:text-cyan-400 transition-colors flex items-center gap-1">CMS Control Plane <ArrowUpRight className="w-3 h-3 text-cyan-400" /></Link></li>
            </ul>
          </div>

          {/* Col 3: Tech Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Engineered With</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Next.js 15 App Router</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span> React 19 Server Components</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Supabase (PostgreSQL RLS)</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Framer Motion & Tailwind</li>
            </ul>
          </div>

          {/* Col 4: Direct Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Connect</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'GitHub', href: 'https://github.com/mksinghcodes', icon: Github },
                { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
                { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
                { name: 'Email', href: 'mailto:mksingh.codes@gmail.com', icon: Mail },
              ].map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-400 transition-all text-slate-400 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Location: Remote / Global Enterprise Availability
            </p>
          </div>
        </div>

        {/* Bottom Metadata & System Status Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-400">Manoj Singh</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} All Rights Reserved</span>
          </div>

          {/* Live Cloud Status Beacon */}
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Edge Nodes Active
            </div>
            <span className="font-mono text-[11px] text-slate-600">v1.2.0-cloud</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
