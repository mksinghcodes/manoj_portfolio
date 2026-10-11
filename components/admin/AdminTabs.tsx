'use client';

import { useState } from 'react';
import { 
  Award, 
  Video, 
  Camera, 
  LayoutDashboard, 
  Search, 
  Plus, 
  Command, 
  ExternalLink 
} from 'lucide-react';
import { DashboardOverview } from '@/components/admin/DashboardOverview';
import { CertificateManager } from '@/components/admin/CertificateManager';
import { VideoManager } from '@/components/admin/VideoManager';
import { GalleryManager } from '@/components/admin/GalleryManager';
import { CommandPalette } from '@/components/admin/CommandPalette';

interface AdminTabsProps {
  initialCertificates: any[];
  initialVideos: any[];
  initialPhotos: any[];
}

export function AdminTabs({ 
  initialCertificates, 
  initialVideos, 
  initialPhotos 
}: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'certificates' | 'videos' | 'gallery'>('overview');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [modalTrigger, setModalTrigger] = useState<{ type: 'certificate' | 'video' | 'gallery'; timestamp: number } | null>(null);

  const tabs = [
    { 
      id: 'overview', 
      label: 'Control Telemetry', 
      icon: LayoutDashboard,
      count: null,
    },
    { 
      id: 'certificates', 
      label: 'Certificates CMS', 
      icon: Award, 
      count: initialCertificates.length 
    },
    { 
      id: 'videos', 
      label: 'Keynote & Meetings', 
      icon: Video, 
      count: initialVideos.length 
    },
    { 
      id: 'gallery', 
      label: 'Event Photo Gallery', 
      icon: Camera, 
      count: initialPhotos.length 
    },
  ];

  const handleOpenModal = (type: 'certificate' | 'video' | 'gallery') => {
    // Switch to respective tab and notify manager
    if (type === 'certificate') setActiveTab('certificates');
    if (type === 'video') setActiveTab('videos');
    if (type === 'gallery') setActiveTab('gallery');
    setModalTrigger({ type, timestamp: Date.now() });
  };

  return (
    <div className="space-y-6">
      {/* Top Bar: Navigation Tabs & Command Palette Trigger */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        {/* Navigation Tabs Pill Strip */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-cyan-900/60 text-cyan-200' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Command Palette Trigger Button */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="inline-flex items-center justify-between gap-3 px-3.5 py-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-400 hover:text-slate-200 shadow-sm transition-all group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Search or command...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-400 group-hover:text-cyan-300">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>

      {/* Dynamic Tab Panes */}
      {activeTab === 'overview' && (
        <DashboardOverview
          certificates={initialCertificates}
          videos={initialVideos}
          photos={initialPhotos}
          onSelectTab={setActiveTab}
          onOpenModal={handleOpenModal}
        />
      )}

      {activeTab === 'certificates' && (
        <CertificateManager 
          items={initialCertificates} 
          triggerModal={modalTrigger?.type === 'certificate' ? modalTrigger.timestamp : undefined}
        />
      )}

      {activeTab === 'videos' && (
        <VideoManager 
          items={initialVideos} 
          triggerModal={modalTrigger?.type === 'video' ? modalTrigger.timestamp : undefined}
        />
      )}

      {activeTab === 'gallery' && (
        <GalleryManager 
          items={initialPhotos} 
          triggerModal={modalTrigger?.type === 'gallery' ? modalTrigger.timestamp : undefined}
        />
      )}

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectTab={setActiveTab}
        onOpenModal={handleOpenModal}
      />
    </div>
  );
}
