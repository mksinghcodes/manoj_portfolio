'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Terminal, 
  ArrowUpRight, 
  Sparkles,
  Award,
  Video,
  Camera,
  Layers
} from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['hero', 'certifications', 'videos', 'gallery'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#hero', id: 'hero', icon: Layers },
    { name: 'Certifications', href: '#certifications', id: 'certifications', icon: Award },
    { name: 'Keynotes & Talks', href: '#videos', id: 'videos', icon: Video },
    { name: 'Event Gallery', href: '#gallery', id: 'gallery', icon: Camera },
  ];

  return (
    <>
      {/* Floating Modern Header Dock */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo / Architectural Emblem */}
          <Link 
            href="#hero"
            className="group flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 backdrop-blur-xl transition-all duration-200 shadow-lg shadow-black/30"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform">
              MKS
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white tracking-wide leading-none group-hover:text-cyan-300 transition-colors">
                Manoj Kumar Singh
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                Principal Architect
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Pill Dock */}
          <nav className="hidden md:flex items-center p-1.5 rounded-full bg-slate-950/70 border border-slate-800/80 backdrop-blur-2xl shadow-xl shadow-black/40">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster: Status Badge & Connect CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Live Operational Beacon */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-500/30 text-[11px] font-medium text-emerald-300 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Systems Operational
            </div>

            {/* Direct Connect Action */}
            <a
              href="mailto:mksingh.codes@gmail.com"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-600/90 hover:bg-cyan-500 text-white text-xs font-semibold backdrop-blur-xl transition-all duration-200 shadow-md shadow-cyan-900/30"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden p-4 rounded-3xl bg-slate-950/95 border border-slate-800/90 backdrop-blur-2xl shadow-2xl space-y-3"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-xs text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Systems Operational
              </div>
              <a
                href="mailto:mksingh.codes@gmail.com"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
