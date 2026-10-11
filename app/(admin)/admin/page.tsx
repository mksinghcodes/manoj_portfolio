import { createClient } from '@/lib/supabase/server';
import { AdminTabs } from '@/components/admin/AdminTabs';

export default async function AdminDashboardPage() {
  let certificates: any[] = [];
  let videos: any[] = [];
  let photos: any[] = [];

  try {
    const supabase = await createClient();

    const [
      { data: certData, error: certErr },
      { data: videoData, error: videoErr },
      { data: photoData, error: photoErr },
    ] = await Promise.all([
      supabase.from('certificates').select('*').order('display_order', { ascending: true }),
      supabase.from('videos').select('*').order('date', { ascending: false }),
      supabase.from('gallery_photos').select('*').order('display_order', { ascending: true }),
    ]);

    if (!certErr && certData) certificates = certData;
    if (!videoErr && videoData) videos = videoData;
    if (!photoErr && photoData) photos = photoData;
  } catch (err) {
    console.warn('Supabase not yet configured or unreachable, using local fallback state:', err);
  }

  // Fallback initial certificates if database is empty or not yet connected
  if (certificates.length === 0) {
    certificates = [
      {
        id: 'cert-1',
        title: 'Google AI Certification',
        issuer: 'Google',
        status: 'completed',
        issue_date: '2025-11-15',
        credential_url: 'https://coursera.org/verify/google-ai',
        image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        category: 'AI',
        display_order: 1,
      },
      {
        id: 'cert-2',
        title: 'Google AI Essentials',
        issuer: 'Google',
        status: 'completed',
        issue_date: '2025-08-10',
        credential_url: 'https://coursera.org/verify/google-ai-essentials',
        image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
        category: 'AI',
        display_order: 2,
      },
      {
        id: 'cert-3',
        title: 'Google IT Support Professional Certificate',
        issuer: 'Google / Coursera',
        status: 'in_progress',
        issue_date: null,
        credential_url: null,
        image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
        category: 'IT Support',
        display_order: 3,
      },
      {
        id: 'cert-4',
        title: 'Google Cybersecurity Professional Certificate',
        issuer: 'Google / Coursera',
        status: 'in_progress',
        issue_date: null,
        credential_url: null,
        image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
        category: 'Cybersecurity',
        display_order: 4,
      },
    ];
  }

  if (videos.length === 0) {
    videos = [
      {
        id: 'vid-1',
        title: 'Architecting Cloud Zero-Trust Infrastructure',
        event_name: 'Global Tech Summit 2025',
        youtube_url_or_id: 'dQw4w9WgXcQ',
        date: '2025-10-14',
        description: 'Deep dive into micro-segmentation, identity-aware proxies, and automated security posture management.',
      },
      {
        id: 'vid-2',
        title: 'Deploying Production AI Agents at Scale',
        event_name: 'Applied AI Engineers Meetup',
        youtube_url_or_id: 'https://youtu.be/dQw4w9WgXcQ',
        date: '2025-07-22',
        description: 'Technical walkthrough of context caching, multi-turn reasoning agents, and vector storage integration.',
      },
    ];
  }

  if (photos.length === 0) {
    photos = [
      {
        id: 'photo-1',
        title: 'Google Cloud Architecture Keynote',
        event_name: 'Tech Horizon 2025',
        image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
        date: 'Nov 2025',
        display_order: 1,
      },
      {
        id: 'photo-2',
        title: 'Applied AI & ML Hands-on Lab',
        event_name: 'DevFest Global',
        image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80',
        date: 'Oct 2025',
        display_order: 2,
      },
    ];
  }

  return (
    <div className="space-y-6">
      <AdminTabs
        initialCertificates={certificates}
        initialVideos={videos}
        initialPhotos={photos}
      />
    </div>
  );
}
