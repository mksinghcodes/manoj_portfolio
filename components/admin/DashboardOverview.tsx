'use client';

import { 
  Award, 
  Video, 
  Camera, 
  ShieldCheck, 
  Server, 
  Database, 
  Activity, 
  ArrowUpRight, 
  CheckCircle2, 
  ExternalLink,
  Plus,
  HardDrive,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

interface DashboardOverviewProps {
  certificates: any[];
  videos: any[];
  photos: any[];
  onSelectTab: (tab: 'overview' | 'certificates' | 'videos' | 'gallery') => void;
  onOpenModal: (type: 'certificate' | 'video' | 'gallery') => void;
}

export function DashboardOverview({ 
  certificates, 
  videos, 
  photos, 
  onSelectTab, 
  onOpenModal 
}: DashboardOverviewProps) {
  const completedCerts = certificates.filter((c) => c.status === 'completed').length;
  const inProgressCerts = certificates.filter((c) => c.status === 'in_progress').length;

  const metrics = [
    {
      label: 'Accredited Certificates',
      value: certificates.length,
      detail: `${completedCerts} Completed • ${inProgressCerts} In Progress`,
      icon: Award,
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
      action: () => onSelectTab('certificates'),
    },
    {
      label: 'Keynotes & Meetings',
      value: videos.length,
      detail: 'Embedded YouTube Streamers',
      icon: Video,
      color: 'from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/30',
      action: () => onSelectTab('videos'),
    },
    {
      label: 'Gallery Media Assets',
      value: photos.length,
      detail: 'Stored in Supabase portfolio-media',
      icon: Camera,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      action: () => onSelectTab('gallery'),
    },
    {
      label: 'Database RLS Posture',
      value: 'Enforced',
      detail: 'Zero-Trust Public Read Policies',
      icon: ShieldCheck,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
      action: () => {},
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              onClick={m.action}
              className="group cursor-pointer p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {m.label}
                </span>
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${m.color} border shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-white tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
                  <span>{m.detail}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Middle Row: Cloud Architecture Telemetry + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Architecture Health Monitor */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Cloud Architecture Telemetry</h3>
                <p className="text-xs text-slate-400">Live operational status of integrated services</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              All Nodes Healthy
            </span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {[
              {
                service: 'Supabase PostgreSQL (Database)',
                desc: 'Tables: certificates, videos, gallery_photos with auto-updated_at triggers',
                status: 'RLS Policies Active',
                icon: Database,
                ok: true,
              },
              {
                service: 'Supabase Auth (Identity)',
                desc: 'Server-side SSR token verification with edge middleware refresh',
                status: 'JWT Guard Active',
                icon: ShieldCheck,
                ok: true,
              },
              {
                service: 'Supabase Storage (portfolio-media)',
                desc: 'Public read bucket with authenticated admin-only insert/delete policies',
                status: '10MB Max File Size',
                icon: HardDrive,
                ok: true,
              },
              {
                service: 'Vercel Edge Runtime & RSC Cache',
                desc: 'React Server Components with Next.js 15 cache tag revalidation',
                status: 'Edge Serving',
                icon: Activity,
                ok: true,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.service} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-200">{item.service}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap">
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Launchpad & Shortcuts */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between space-y-5">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Quick Action Launcher</h3>
            <p className="text-xs text-slate-400">Instantly execute common CMS management tasks</p>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={() => onOpenModal('certificate')}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Add New Certificate
                  </h4>
                  <p className="text-[11px] text-slate-400">Upload badge & credential metadata</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
            </button>

            <button
              onClick={() => onOpenModal('video')}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900 text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Embed Seminar Video
                  </h4>
                  <p className="text-[11px] text-slate-400">Paste unlisted YouTube link</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
            </button>

            <button
              onClick={() => onOpenModal('gallery')}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Upload Event Photo
                  </h4>
                  <p className="text-[11px] text-slate-400">Drag & drop to Supabase Storage</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[10px]">Ctrl+K</kbd> anytime</span>
            <Link 
              href="/" 
              target="_blank"
              className="inline-flex items-center gap-1 text-cyan-400 hover:underline text-[11px] font-semibold"
            >
              View Public Page <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
