import { Hero } from '@/components/public/Hero';
import { CertificatesSection } from '@/components/public/CertificatesSection';
import { VideoShowcase } from '@/components/public/VideoShowcase';
import { EventGalleryMarquee } from '@/components/public/EventGalleryMarquee';

export default function PortfolioLandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <Hero />
      <CertificatesSection />
      <VideoShowcase />
      <EventGalleryMarquee />
    </main>
  );
}
