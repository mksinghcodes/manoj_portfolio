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
  Layers,
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
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } 
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
    <section id="hero" className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100 pt-28 pb-16">
      {/* Background Architectural Mesh & Radiant Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.14]" 
          style={{
            backgroundImage: `radial-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px), radial-gradient(rgba(99, 102, 241, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
        />
        <div className="absolute -top-40 left-1/4 w-[750px] h-[550px] bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 2-Column Responsive Layout: Content on Left, Profile Photo on Right */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* LEFT COLUMN: Bio & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Specialization Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md text-xs font-semibold text-cyan-300 shadow-sm shadow-cyan-950/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Principal IT & Cloud Infrastructure Specialist
              </div>
            </motion.div>

            {/* Main Hero Heading with Name: Manoj Kumar Singh */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08]"
            >
              Manoj Kumar Singh
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Cloud Platforms
              </span>{' '}
              & AI Systems
            </motion.h1>

            {/* Subheading / Executive Bio */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-300/90 leading-relaxed font-normal max-w-xl"
            >
              Specializing in enterprise cloud infrastructure, Zero-Trust network security, 
              and scalable applied artificial intelligence. Committed to continuous mastery across 
              Google Cloud, distributed architectures, and automated DevOps operations.
            </motion.p>

            {/* Call to Actions */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <a
                href="/assets/resume.pdf"
                download
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.98]"
              >
                <FileDown className="w-4 h-4" />
                Download Curriculum Vitae
              </a>

              <Link
                href="#certifications"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md text-slate-200 font-semibold text-sm transition-all duration-300 hover:border-cyan-500/50 hover:text-white"
              >
                Verified Credentials
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </Link>
            </motion.div>

            {/* Social Media Links with Username: mksinghnepal */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-400 font-bold mr-1">
                <span>Connect</span>
                <span className="text-cyan-400 font-mono text-[11px]">@mksinghnepal</span>
              </div>

              <div className="flex items-center gap-2">
                {socialLinks.map(({ label, href, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (@mksinghnepal)`}
                    className={`p-2.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-400 transition-all duration-200 shadow-md ${color}`}
                    title={`${label}: ${href}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Profile Photo Space */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group max-w-sm w-full">
              {/* Outer Radiant Ambient Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-600 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition duration-700 group-hover:scale-105" />

              {/* Main Photo Card Frame */}
              <div className="relative rounded-3xl bg-slate-900/90 border-2 border-cyan-400/40 p-3 sm:p-4 backdrop-blur-2xl shadow-2xl shadow-black/80">
                {/* Photo Aspect Container */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgError ? '/assets/avatar-placeholder.svg' : imgSrc}
                    alt="Manoj Kumar Singh - Principal Cloud & Systems Architect"
                    onError={() => {
                      setImgError(true);
                      setImgSrc('/assets/avatar-placeholder.svg');
                    }}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Top-Right Verified Badge */}
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-cyan-500/40 backdrop-blur-md text-[11px] font-semibold text-cyan-300 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Verified Architect</span>
                  </div>

                  {/* Gradient Vignette at Bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent pointer-events-none" />

                  {/* Overlay Name & Live Status at bottom of photo */}
                  <div className="absolute inset-x-3 bottom-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-white tracking-wide">
                          Manoj Kumar Singh
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          Principal Cloud & Systems Architect
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] font-semibold text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Active
                      </div>
                    </div>
                  </div>
                </div>

                {/* Micro Telemetry Badges below photo frame */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2 text-slate-300">
                    <Cloud className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">Google Cloud & AI</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2 text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Zero-Trust L3</span>
                  </div>
                </div>
              </div>

              {/* Floating Top-Left Micro Badge */}
              <div className="absolute -top-4 -left-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 text-xs font-semibold text-cyan-300 backdrop-blur-xl shadow-xl shadow-black/60">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Enterprise Advisory</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 3 Core Architecture Pillars across bottom of Hero */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4"
        >
          {[
            { icon: Cpu, title: 'AI & Machine Learning', desc: 'GenAI & Cloud Pipelines' },
            { icon: ShieldCheck, title: 'Security & Operations', desc: 'Zero-Trust Architecture' },
            { icon: Terminal, title: 'Enterprise Support', desc: 'L3 Systems Administration' },
          ].map((pillar) => (
            <div 
              key={pillar.title}
              className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md text-left flex items-start gap-3.5 hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all"
            >
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                <pillar.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-200">{pillar.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
