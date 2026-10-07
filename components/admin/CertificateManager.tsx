'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { upsertCertificate, deleteCertificate } from '@/app/actions/certificates';
import { Plus, Trash2, Edit3, Upload, CheckCircle2, Clock, Loader2, X } from 'lucide-react';

export function CertificateManager({ items: initialItems }: { items: any[] }) {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

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
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
        image_url: '',
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">Certificates ({items.length})</h2>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((cert) => (
          <div key={cert.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-semibold">{cert.category}</span>
                {cert.status === 'completed' ? (
                  <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-400"><Clock className="w-3.5 h-3.5" /> In Progress</span>
                )}
              </div>
              <h4 className="font-bold text-white text-sm">{cert.title}</h4>
              <p className="text-xs text-slate-400">{cert.issuer}</p>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-800/60">
              <button onClick={() => openModal(cert)} className="p-1.5 hover:text-cyan-400 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(cert.id)} className="p-1.5 hover:text-rose-400 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
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
              {editingCert ? 'Edit Certificate' : 'New Certificate'}
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
                  <label className="block text-xs font-medium text-slate-400 mb-1">Issuer</label>
                  <input
                    type="text"
                    required
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
                  >
                    {['AI', 'Cybersecurity', 'IT Support', 'Data', 'Marketing'].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <label className="text-xs font-medium text-slate-400">Status:</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'completed' })}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      formData.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'in_progress', issue_date: '' })}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      formData.status === 'in_progress' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    In Progress
                  </button>
                </div>
              </div>

              {formData.status === 'completed' && (
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={formData.issue_date}
                    onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Badge Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://... or upload"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
                  />
                  <label className="cursor-pointer px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
