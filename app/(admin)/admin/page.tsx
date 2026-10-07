import { createClient } from '@/lib/supabase/server';
import { AdminTabs } from '@/components/admin/AdminTabs';
import { Award, Video, Camera, Activity } from 'lucide-react';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { data: certificates },
    { data: videos },
    { data: photos },
  ] = await Promise.all([
    supabase.from('certificates').select('*').order('display_order', { ascending: true }),
    supabase.from('videos').select('*').order('date', { ascending: false }),
    supabase.from('gallery_photos').select('*').order('display_order', { ascending: true }),
  ]);

  const metrics = [
    { label: 'Total Certificates', val: certificates?.length ?? 0, icon: Award, color: 'text-cyan-400' },
    { label: 'Keynote & Tech Videos', val: videos?.length ?? 0, icon: Video, color: 'text-indigo-400' },
    { label: 'Event Photos', val: photos?.length ?? 0, icon: Camera, color: 'text-emerald-400' },
    { label: 'Active RLS Policies', val: 'Enforced', icon: Activity, color: 'text-sky-400' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">{m.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{m.val}</p>
            </div>
            <m.icon className={`w-8 h-8 ${m.color} opacity-80`} />
          </div>
        ))}
      </div>

      <AdminTabs
        initialCertificates={certificates ?? []}
        initialVideos={videos ?? []}
        initialPhotos={photos ?? []}
      />
    </div>
  );
}
