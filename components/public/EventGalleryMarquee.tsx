'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Calendar, Pause, Play } from 'lucide-react';
import Image from 'next/image';

interface GalleryPhoto {
  id: string;
  title: string;
  event_name: string;
  image_url: string;
  date: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    title: 'Google Cloud Architecture Keynote',
    event_name: 'Tech Horizon 2025',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    date: 'Nov 2025',
  },
  {
    id: 'photo-2',
    title: 'Applied AI & ML Hands-on Lab',
    event_name: 'DevFest Global',
    image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80',
    date: 'Oct 2025',
  },
  {
    id: 'photo-3',
    title: 'Cybersecurity Threat Defense Workshop',
    event_name: 'InfoSec Summit',
    image_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80',
    date: 'Aug 2025',
  },
  {
    id: 'photo-4',
    title: 'Enterprise IT Systems Roundtable',
    event_name: 'CIO Network Forum',
    image_url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80',
    date: 'Jun 2025',
  },
  {
    id: 'photo-5',
    title: 'Cloud Native Infrastructure Hackathon',
    event_name: 'Open Cloud Connect',
    image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
    date: 'Mar 2025',
  },
];

export function EventGalleryMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  const marqueeItems = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS];

  return (
    <section id="gallery" className="py-24 bg-slate-950 text-slate-100 overflow-hidden relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-900 text-xs font-medium text-slate-400 mb-3">
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              Event Highlights & Gallery
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Seminars & Meeting Moments
            </h2>
          </div>

          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-xs text-slate-400 hover:text-white transition-colors"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
            {isPaused ? 'Resume Scroll' : 'Pause Scroll'}
          </button>
        </div>
      </div>

      <div 
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-slate-950 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-slate-950 to-transparent z-10" />

        <motion.div
          animate={{ x: isPaused ? undefined : ['0%', '-50%'] }}
          transition={{
            x: {
              duration: 35,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
          className="flex gap-6 w-max py-4"
        >
          {marqueeItems.map((photo, idx) => (
            <div
              key={`${photo.id}-${idx}`}
              className="group relative w-80 sm:w-96 h-64 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shrink-0 shadow-lg"
            >
              <Image
                src={photo.image_url}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 320px, 384px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-medium text-cyan-300 w-fit mb-2">
                  <Calendar className="w-3 h-3" />
                  {photo.date} • {photo.event_name}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
