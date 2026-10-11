'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { upsertCertificate, deleteCertificate } from '@/app/actions/certificates';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Loader2, 
  X, 
  Search, 
  Filter, 
  ExternalLink,
  Tag
} from 'lucide-react';
import Image from 'next/image';

interface CertificateManagerProps {
  items: any[];
  triggerModal?: number;
}

export function CertificateManager({ items: initialItems, triggerModal }: CertificateManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Trigger from Command Palette / Dashboard launcher
  useEffect(() => {
    if (triggerModal) {
      openModal();
    }
  }, [triggerModal]);

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    status: 'completed' as 'completed' | 'in_progress',
    issue_date: '',
    credential_url: '',
    image_url: '',
    category: 'AI' as 'AI' | 'Cybersecurity' | 'IT Support' | 'Data' | 'Marketing',
    display_order: 0,
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  );

  const openModal = (cert?: any) => {
    if (cert) {
      setEditingCert(cert);
      setFormData({
        title: cert.title,
        issuer: cert.issuer,
        status: cert.status,
        issue_date: cert.issue_date || '',
        credential_url: cert.credential_url || '',
        image_url: cert.image_url,
        category: cert.category,
        display_order: cert.display_order,
      });
    } else {
      setEditingCert(null);
      setFormData({
        title: '',
        issuer: 'Google',
        status: 'completed',
        issue_date: new Date().toISOString().split('T')[0],
        credential_url: '',
        image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        category: 'AI',
        display_order: items.length + 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const ext = file.name.split('.').pop();
      const filename = `cert_${Date.now()}.${ext}`;

      const { data, error } = await supabase.storage
        .from('portfolio-media')
        .upload(`certificates/${filename}`, file, { upsert: true });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(data.path);

      setFormData((prev) => ({ ...prev, image_url: publicUrlData.publicUrl }));
    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await upsertCertificate({
        ...(editingCert ? { id: editingCert.id } : {}),
        ...formData,
      });
      setIsModalOpen(false);
      window.location.reload();
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    await deleteCertificate(id);
  };

  // Direct toggle between Completed & In Progress from the card
  const handleToggleStatus = async (cert: any) => {
    const nextStatus = cert.status === 'completed' ? 'in_progress' : 'completed';
    // Optimistic UI update
    setItems((prev) =>
      prev.map((i) => (i.id === cert.id ? { ...i, status: nextStatus } : i))
    );
    await upsertCertificate({
      id: cert.id,
      title: cert.title,
      issuer: cert.issuer,
      status: nextStatus,
      issue_date: nextStatus === 'completed' ? (cert.issue_date || new Date().toISOString().split('T')[0]) : null,
      credential_url: cert.credential_url,
      image_url: cert.image_url,
      category: cert.category,
      display_order: cert.display_order,
    });
  };

  const categories = ['All', 'AI', 'Cybersecurity', 'IT Support', 'Data', 'Marketing'];

  const filteredItems = items.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || cert.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Action Header & Search Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Certificates Catalog ({filteredItems.length})</h2>
          <p className="text-xs text-slate-400">Manage verified badges, learning tracks, and credential URLs</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title/issuer..."
              className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Certificate
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((cert) => (
          <div 
            key={cert.id} 
            className="group p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-cyan-400 font-semibold text-[11px] border border-slate-700/60">
                  {cert.category}
                </span>

                {/* Instant Status Toggle Button */}
                <button
                  onClick={() => handleToggleStatus(cert)}
                  title="Click to toggle status"
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    cert.status === 'completed'
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/50'
                      : 'bg-amber-950/40 text-amber-400 border border-amber-500/30 hover:bg-amber-900/50'
                  }`}
                >
                  {cert.status === 'completed' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      In Progress
                    </>
                  )}
                </button>
              </div>

              <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors line-clamp-1">
                {cert.title}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {cert.issuer} {cert.issue_date && `• ${cert.issue_date}`}
              </p>
            </div>

            <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-500">
                Order: #{cert.display_order}
              </span>
              <div className="flex items-center gap-1">
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-cyan-400"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button 
                  onClick={() => openModal(cert)} 
                  className="p-1.5 text-slate-400 hover:text-cyan-400"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(cert.id)} 
                  className="p-1.5 text-slate-400 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
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
              {editingCert ? 'Edit Certificate' : 'New Certificate Credential'}
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Issuer</label>
                  <input
                    type="text"
                    required
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    {['AI', 'Cybersecurity', 'IT Support', 'Data', 'Marketing'].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Selector */}
              <div className="flex gap-4 items-center">
                <label className="text-xs font-semibold text-slate-300">Track Status:</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'completed' })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      formData.status === 'completed' 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'in_progress', issue_date: '' })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      formData.status === 'in_progress' 
                        ? 'bg-amber-600 text-white shadow-sm' 
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    In Progress
                  </button>
                </div>
              </div>

              {formData.status === 'completed' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={formData.issue_date}
                    onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Verification URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://coursera.org/verify/..."
                  value={formData.credential_url}
                  onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Badge Image URL / Storage Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://... or upload"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin text-cyan-400" /> : <Upload className="w-4 h-4" />}
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
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
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-600/25"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
