'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileDown, 
  Github, 
  Linkedin, 
  Youtube, 
  ArrowUpRight, 
  ShieldCheck, 
  Cpu, 
  Terminal,
  CheckCircle2,
  Cloud,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

// Custom SVG icon for X (formerly Twitter)
function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Custom SVG icon for Facebook
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function Hero() {
  const [imgSrc, setImgSrc] = useState('/assets/profile.jpg');
  const [imgError, setImgError] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } 
    },
  };

  const socialLinks = [
    { 
      label: 'GitHub', 
      href: 'https://github.com/mksinghnepal', 
      icon: Github, 
      color: 'hover:text-white hover:border-slate-500' 
    },
    { 
      label: 'LinkedIn', 
      href: 'https://linkedin.com/in/mksinghnepal', 
      icon: Linkedin, 
      color: 'hover:text-sky-400 hover:border-sky-500/40' 
    },
    { 
      label: 'X (Twitter)', 
      href: 'https://x.com/mksinghnepal', 
      icon: XTwitterIcon, 
      color: 'hover:text-slate-100 hover:border-slate-500' 
    },
    { 
      label: 'YouTube', 
      href: 'https://youtube.com/@mksinghnepal', 
      icon: Youtube, 
      color: 'hover:text-rose-400 hover:border-rose-500/40' 
    },
    { 
      label: 'Facebook', 
      href: 'https://facebook.com/mksinghnepal', 
      icon: FacebookIcon, 
      color: 'hover:text-blue-400 hover:border-blue-500/40' 
    },
  ];

  return (
    <section id="hero" className="relative flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100 pt-24 pb-12 sm:pt-28 sm:pb-16">
      {/* Background Subtle Mesh & Ambient Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.12]" 
          style={{
            backgroundImage: `radial-gradient(rgba(56, 189, 248, 0.35) 1px, transparent 1px), radial-gradient(rgba(99, 102, 241, 0.2) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0, 18px 18px',
          }}
        />
        <div className="absolute -top-32 left-1/3 w-[650px] h-[450px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-purple-500/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-5 right-5 w-[420px] h-[420px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Compact 2-Column Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
        >
          {/* LEFT COLUMN: Focused Bio, Name & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4 sm:space-y-5">
            {/* Specialization Beacon */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-cyan-300 shadow-sm shadow-cyan-950/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Principal IT & Cloud Infrastructure Specialist
              </div>
            </motion.div>

            {/* Tight, Punchy Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.12]"
            >
              Manoj Kumar Singh
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 mt-1">
                Enterprise Cloud & AI Systems
              </span>
            </motion.h1>

            {/* Concise Executive Bio */}
            <motion.p 
              variants={itemVariants}
              className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal max-w-xl"
            >
              Architecting enterprise cloud platforms, Zero-Trust network security, and scalable 
              applied artificial intelligence across Google Cloud, distributed architectures, 
              and automated DevOps operations.
            </motion.p>

            {/* Interactive Action Row & Social Connections */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <a
                href="/assets/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.98]"
              >
                <FileDown className="w-4 h-4" />
                Download CV
              </a>

              <Link
                href="#certifications"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md text-slate-200 font-semibold text-xs sm:text-sm transition-all duration-300 hover:border-cyan-500/50 hover:text-white"
              >
                Verified Credentials
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </Link>

              {/* Social Media Links Inline */}
              <div className="flex items-center gap-1.5 pl-2 sm:border-l sm:border-slate-800">
                {socialLinks.map(({ label, href, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (@mksinghnepal)`}
                    className={`p-2 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-400 transition-all duration-200 ${color}`}
                    title={`${label}: @mksinghnepal`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Compact & Attractive Profile Photo Frame */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Outer Radiant Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-600 rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition duration-500 group-hover:scale-[1.02]" />

              {/* Core Photo Frame */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-3xl overflow-hidden bg-slate-900 border-2 border-cyan-400/50 shadow-2xl shadow-cyan-950/70 backdrop-blur-xl flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgError ? '/assets/avatar-placeholder.svg' : imgSrc}
                  alt="Manoj Kumar Singh - Principal Cloud Architect"
                  onError={() => {
                    setImgError(true);
                    setImgSrc('/assets/avatar-placeholder.svg');
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Top-Right Verified Badge */}
                <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/85 border border-cyan-500/40 backdrop-blur-md text-[10px] font-semibold text-cyan-300 shadow-md">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Verified</span>
                </div>

                {/* Subtle Bottom Vignette */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none" />
              </div>

              {/* Floating Top-Left Micro Badge */}
              <div className="absolute -top-3 -left-3 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-[10px] font-semibold text-cyan-300 backdrop-blur-md shadow-lg">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Google Cloud & AI</span>
              </div>

              {/* Floating Bottom Center Beacon */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-emerald-500/40 text-[10px] sm:text-[11px] font-semibold text-emerald-300 backdrop-blur-md shadow-lg shadow-black/60">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Available for Advisory</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 3 Compact Architectural Pillars */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2"
        >
          {[
            { icon: Cpu, title: 'AI & Machine Learning', desc: 'GenAI & Cloud Pipelines' },
            { icon: ShieldCheck, title: 'Security & Zero-Trust', desc: 'Enterprise Posture Management' },
            { icon: Terminal, title: 'Enterprise Support', desc: 'L3 Systems Administration' },
          ].map((pillar) => (
            <div 
              key={pillar.title}
              className="p-3.5 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md text-left flex items-center gap-3 hover:border-cyan-500/20 hover:bg-slate-900/60 transition-all shadow-sm"
            >
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                <pillar.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-semibold text-slate-200 truncate">{pillar.title}</h3>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
