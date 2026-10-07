'use client';

import { useState } from 'react';
import { Award, Video, Camera, BarChart3 } from 'lucide-react';
import { CertificateManager } from '@/components/admin/CertificateManager';
import { VideoManager } from '@/components/admin/VideoManager';
import { GalleryManager } from '@/components/admin/GalleryManager';

export function AdminTabs({ initialCertificates, initialVideos, initialPhotos }: any) {
  const [activeTab, setActiveTab] = useState<'certificates' | 'videos' | 'gallery' | 'analytics'>('certificates');

  const tabs = [
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'videos', label: 'Meeting Videos', icon: Video },
    { id: 'gallery', label: 'Gallery Photos', icon: Camera },
    { id: 'analytics', label: 'Site Overview', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex border-b border-slate-800 gap-2 pb-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'certificates' && <CertificateManager items={initialCertificates} />}
      {activeTab === 'videos' && <VideoManager items={initialVideos} />}
      {activeTab === 'gallery' && <GalleryManager items={initialPhotos} />}
      {activeTab === 'analytics' && (
        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 text-center space-y-3">
          <BarChart3 className="w-10 h-10 text-cyan-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Edge Caching & Performance Active</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Supabase PostgreSQL RLS rules are active. Public requests are served via Vercel Edge Cache with zero database write access granted to anonymous users.
          </p>
        </div>
      )}
    </div>
  );
}
