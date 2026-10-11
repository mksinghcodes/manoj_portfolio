'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Award, 
  Video, 
  Camera, 
  ExternalLink, 
  LogOut, 
  Plus, 
  X, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logoutAdmin } from '@/app/actions/auth';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: 'overview' | 'certificates' | 'videos' | 'gallery') => void;
  onOpenModal: (type: 'certificate' | 'video' | 'gallery') => void;
}

export function CommandPalette({ isOpen, onClose, onSelectTab, onOpenModal }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Keyboard shortcut Ctrl+K or Cmd+K
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (isOpen) onClose();
      else onClose(); // parent handles toggle
    }
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'tab-overview',
      title: 'Navigate: System Overview & Telemetry',
      icon: ShieldCheck,
      group: 'Navigation',
      perform: () => { onSelectTab('overview'); onClose(); },
    },
    {
      id: 'tab-cert',
      title: 'Navigate: Certificates Manager',
      icon: Award,
      group: 'Navigation',
      perform: () => { onSelectTab('certificates'); onClose(); },
    },
    {
      id: 'tab-video',
      title: 'Navigate: Meeting & Keynote Videos',
      icon: Video,
      group: 'Navigation',
      perform: () => { onSelectTab('videos'); onClose(); },
    },
    {
      id: 'tab-gallery',
      title: 'Navigate: Event Photo Gallery',
      icon: Camera,
      group: 'Navigation',
      perform: () => { onSelectTab('gallery'); onClose(); },
    },
    {
      id: 'action-new-cert',
      title: 'Action: Add New Certificate Credential',
      icon: Plus,
      group: 'Quick Actions',
      perform: () => { onOpenModal('certificate'); onClose(); },
    },
    {
      id: 'action-new-video',
      title: 'Action: Embed Seminar / Keynote Video',
      icon: Plus,
      group: 'Quick Actions',
      perform: () => { onOpenModal('video'); onClose(); },
    },
    {
      id: 'action-new-photo',
      title: 'Action: Upload Gallery Photo to Storage',
      icon: Plus,
      group: 'Quick Actions',
      perform: () => { onOpenModal('gallery'); onClose(); },
    },
    {
      id: 'action-public',
      title: 'System: Open Public Portfolio Site',
      icon: ExternalLink,
      group: 'System',
      perform: () => { window.open('/', '_blank'); onClose(); },
    },
    {
      id: 'action-logout',
      title: 'System: Sign Out of Admin Session',
      icon: LogOut,
      group: 'System',
      perform: async () => { await logoutAdmin(); },
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-800 bg-slate-950/50">
          <Search className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, sections, or actions (Ctrl + K)..."
            autoFocus
            className="w-full py-4 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.perform}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl hover:bg-slate-800/60 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200 group-hover:text-white">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {item.group}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 group-hover:text-cyan-400 font-mono">
                    ↵ Execute
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between font-mono">
          <span>Tip: Use ESC to exit</span>
          <span>CMS Control Plane v1.2</span>
        </div>
      </div>
    </div>
  );
}
