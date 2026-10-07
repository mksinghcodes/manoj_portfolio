'use client';

import { useState } from 'react';
import { upsertVideo, deleteVideo } from '@/app/actions/videos';
import { Plus, Trash2, Edit3, X, Loader2 } from 'lucide-react';
import { extractYouTubeId } from '@/lib/utils/youtube';

export function VideoManager({ items: initialItems }: { items: any[] }) {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    event_name: '',
    youtube_url_or_id: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">Seminar & Keynote Videos ({items.length})</h2>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((video) => (
          <div key={video.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
            <div>
              <span className="text-[11px] text-cyan-400 font-semibold">{video.event_name} • {video.date}</span>
              <h4 className="font-bold text-white text-sm mt-1">{video.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">{video.description}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-800/60">
              <button onClick={() => openModal(video)} className="p-1.5 hover:text-cyan-400"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(video.id)} className="p-1.5 hover:text-rose-400"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">
              {editingVideo ? 'Edit Seminar Video' : 'Add Seminar Video'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Event Name</label>
                  <input
                    type="text"
                    required
                    value={formData.event_name}
                    onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  YouTube Link or Unlisted Video ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://youtu.be/ID or unlisted URL"
                  value={formData.youtube_url_or_id}
                  onChange={(e) => setFormData({ ...formData, youtube_url_or_id: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono"
                />
                {currentParsedId && (
                  <p className="text-[11px] text-emerald-400 mt-1">
                    ✓ Resolved Valid Video ID: <code className="font-mono">{currentParsedId}</code>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5"
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
