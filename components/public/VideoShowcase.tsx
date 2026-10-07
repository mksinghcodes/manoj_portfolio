'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Calendar, Video, X } from 'lucide-react';
import Image from 'next/image';
import { extractYouTubeId } from '@/lib/utils/youtube';

interface VideoRecord {
  id: string;
  title: string;
  event_name: string;
  youtube_url_or_id: string;
  date: string;
  description: string;
}

const SAMPLE_VIDEOS: VideoRecord[] = [
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
  {
    id: 'vid-3',
    title: 'Enterprise Incident Response & IT Systems Recovery',
    event_name: 'InfraOps Leadership Round',
    youtube_url_or_id: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    date: '2025-04-18',
    description: 'Lessons learned from mitigating critical outages and architecting self-healing Kubernetes clusters.',
  },
];

export function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<VideoRecord | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedVideo(null);
  }, []);

  useEffect(() => {
    if (selectedVideo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo, handleKeyDown]);

  return (
    <section id="videos" className="py-24 bg-slate-900/60 text-slate-100 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-900 text-xs font-medium text-slate-400">
            <Video className="w-3.5 h-3.5 text-cyan-400" />
            Speaking & Technical Demos
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Seminars & Meeting Recordings
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Watch keynotes, private seminar presentations, and technical system demonstrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_VIDEOS.map((video) => {
            const videoId = extractYouTubeId(video.youtube_url_or_id) || 'dQw4w9WgXcQ';
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-cyan-500/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/90 group-hover:bg-cyan-400 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-all">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] font-medium text-slate-300">
                    {video.event_name}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {video.date}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video dialog"
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${extractYouTubeId(selectedVideo.youtube_url_or_id)}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              <div className="p-6 bg-slate-900 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                  <span>{selectedVideo.event_name}</span>
                  <span>•</span>
                  <span>{selectedVideo.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{selectedVideo.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedVideo.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
