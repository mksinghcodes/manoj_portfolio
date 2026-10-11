'use client';

import { useState, useEffect } from 'react';
import { upsertVideo, deleteVideo } from '@/app/actions/videos';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Video, 
  X, 
  Loader2, 
  Search, 
  Calendar, 
  ExternalLink,
  Play
} from 'lucide-react';
import Image from 'next/image';
import { extractYouTubeId } from '@/lib/utils/youtube';

interface VideoManagerProps {
  items: any[];
  triggerModal?: number;
}

export function VideoManager({ items: initialItems, triggerModal }: VideoManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    event_name: '',
    youtube_url_or_id: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  useEffect(() => {
    if (triggerModal) {
      openModal();
    }
  }, [triggerModal]);

  const openModal = (video?: any) => {
    if (video) {
      setEditingVideo(video);
      setFormData(video);
    } else {
      setEditingVideo(null);
      setFormData({
        title: '',
        event_name: '',
        youtube_url_or_id: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await upsertVideo({
        ...(editingVideo ? { id: editingVideo.id } : {}),
        ...formData,
      });
      setIsModalOpen(false);
      window.location.reload();
    } catch (err: any) {
      alert(`Error saving video: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this video recording?')) return;
    setItems((prev) => prev.filter((v) => v.id !== id));
    await deleteVideo(id);
  };

  const currentParsedId = extractYouTubeId(formData.youtube_url_or_id);

  const filteredItems = items.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.event_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Action Header & Search Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Seminar & Keynote Videos ({filteredItems.length})</h2>
          <p className="text-xs text-slate-400">Manage technical recordings, conference talks, and unlisted demo links</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search talks/events..."
              className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Video
          </button>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((video) => {
          const videoId = extractYouTubeId(video.youtube_url_or_id) || 'dQw4w9WgXcQ';
          const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

          return (
            <div 
              key={video.id} 
              className="group p-4 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Thumbnail Preview */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 mb-3.5">
                  <Image 
                    src={thumb} 
                    alt={video.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                    unoptimized 
                  />
                  <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-cyan-500/90 flex items-center justify-center text-slate-950 shadow-md">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[10px] font-semibold text-slate-300">
                    {video.event_name}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-semibold mb-1">
                  <Calendar className="w-3 h-3" />
                  <span>{video.date}</span>
                </div>
                <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {video.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {video.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-500 truncate max-w-[140px]">
                  ID: {videoId}
                </span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => openModal(video)} 
                    className="p-1.5 text-slate-400 hover:text-cyan-400"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(video.id)} 
                    className="p-1.5 text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">
              {editingVideo ? 'Edit Seminar Video' : 'Add Seminar Video'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Event Name</label>
                  <input
                    type="text"
                    required
                    value={formData.event_name}
                    onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  YouTube Share / Unlisted Link or 11-char ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://youtu.be/ID or youtube.com/watch?v=..."
                  value={formData.youtube_url_or_id}
                  onChange={(e) => setFormData({ ...formData, youtube_url_or_id: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                />
                {currentParsedId && (
                  <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300">
                    <span className="font-mono">✓ Detected YouTube ID: {currentParsedId}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-600/25"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
