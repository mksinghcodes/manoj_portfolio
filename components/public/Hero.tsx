'use client';

import { motion } from 'framer-motion';
import { 
  FileDown, 
  Github, 
  Linkedin, 
  Youtube, 
  ArrowUpRight, 
  ShieldCheck, 
  Cpu, 
  Terminal 
} from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100 pt-24 pb-16">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{
            backgroundImage: `radial-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px), radial-gradient(rgba(99, 102, 241, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
        />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md text-xs font-medium text-cyan-300 shadow-sm shadow-cyan-950/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Principal IT & Cloud Infrastructure Specialist
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Architecting Resilient{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Cloud Platforms
            </span>{' '}
            & AI Systems
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-300/90 leading-relaxed font-normal"
          >
            Specializing in enterprise cloud infrastructure, Zero-Trust network security, 
            and scalable applied artificial intelligence. Committed to continuous mastery across 
            Google Cloud, distributed architectures, and automated DevOps operations.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <a
              href="/assets/resume.pdf"
              download
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.98]"
            >
              <FileDown className="w-4 h-4" />
              Download Curriculum Vitae
            </a>

            <Link
              href="#certifications"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md text-slate-200 font-medium text-sm transition-all duration-300 hover:border-slate-500"
            >
              Verified Credentials
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3 pt-4"
          >
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mr-2">
              Connect
            </span>

            {[
              { label: 'GitHub', href: 'https://github.com', icon: Github },
              { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
              { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
            ].map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/70 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8"
          >
            {[
              { icon: Cpu, title: 'AI & Machine Learning', desc: 'GenAI & Cloud Pipelines' },
              { icon: ShieldCheck, title: 'Security & Operations', desc: 'Zero-Trust Architecture' },
              { icon: Terminal, title: 'Enterprise Support', desc: 'L3 Systems Administration' },
            ].map((pillar) => (
              <div 
                key={pillar.title}
                className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md text-left flex items-start gap-3.5 hover:border-white/10 transition-colors"
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
        </motion.div>
      </div>
    </section>
  );
}
