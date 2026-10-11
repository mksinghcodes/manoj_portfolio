'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { upsertGalleryPhoto, deleteGalleryPhoto } from '@/app/actions/gallery';
import { 
  Plus, 
  Trash2, 
  UploadCloud, 
  X, 
  Loader2, 
  Search, 
  Calendar, 
  ImageIcon 
} from 'lucide-react';
import Image from 'next/image';

interface GalleryManagerProps {
  items: any[];
  triggerModal?: number;
}

export function GalleryManager({ items: initialItems, triggerModal }: GalleryManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    event_name: '',
    image_url: '',
    date: new Date().toISOString().split('T')[0],
    display_order: 0,
  });

  useEffect(() => {
    if (triggerModal) {
      openModal();
    }
  }, [triggerModal]);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  );

  const openModal = () => {
    setFormData({
      title: '',
      event_name: '',
      image_url: '',
      date: new Date().toISOString().split('T')[0],
      display_order: items.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      const ext = file.name.split('.').pop();
      const path = `gallery/photo_${Date.now()}.${ext}`;

      const { data, error } = await supabase.storage
        .from('portfolio-media')
        .upload(path, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(data.path);

      setFormData((prev) => ({ ...prev, image_url: urlData.publicUrl }));
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await upsertGalleryPhoto(formData);
      setIsModalOpen(false);
      window.location.reload();
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this photo?')) return;
    setItems((prev) => prev.filter((p) => p.id !== id));
    await deleteGalleryPhoto(id);
  };

  const filteredItems = items.filter((photo) =>
    photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.event_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Event Gallery Photos ({filteredItems.length})</h2>
          <p className="text-xs text-slate-400">Manage seminar memories and high-resolution photo assets</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photo/event..."
              className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Photo
          </button>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredItems.map((photo) => (
          <div 
            key={photo.id} 
            className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-video shadow-md hover:border-slate-700 transition-all"
          >
            <Image 
              src={photo.image_url} 
              alt={photo.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                  {photo.event_name}
                </span>
                <p className="text-xs font-bold text-white mt-1.5 line-clamp-1">{photo.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{photo.date}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-500">Order: #{photo.display_order}</span>
                <button 
                  onClick={() => handleDelete(photo.id)} 
                  className="p-1 rounded bg-rose-950/60 text-rose-400 hover:text-rose-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Add Event Gallery Photo</h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-2xl p-6 text-center transition-colors bg-slate-950/50"
              >
                {formData.image_url ? (
                  <div className="relative aspect-video w-full max-h-40 mx-auto rounded-xl overflow-hidden">
                    <Image src={formData.image_url} alt="Uploaded" fill className="object-cover" />
                  </div>
                ) : uploading ? (
                  <div className="flex flex-col items-center gap-2 py-4 text-cyan-400">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-xs font-medium">Uploading to Supabase Storage...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <UploadCloud className="w-8 h-8 text-slate-500" />
                    <p className="text-xs text-slate-400">Drag & drop photo here or browse</p>
                    <label className="cursor-pointer text-xs font-semibold text-cyan-400 hover:underline">
                      Select Local File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

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
                  disabled={saving || !formData.image_url}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-600/25 disabled:opacity-50"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
