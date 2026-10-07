'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Tag 
} from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  status: 'completed' | 'in_progress';
  issue_date?: string;
  credential_url?: string;
  image_url: string;
  category: 'AI' | 'Cybersecurity' | 'IT Support' | 'Data' | 'Marketing';
  progress?: number;
  current_module?: string;
  skills: string[];
}

const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Google AI Certification',
    issuer: 'Google',
    status: 'completed',
    issue_date: '2025-11-15',
    credential_url: 'https://coursera.org/verify/google-ai',
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    category: 'AI',
    skills: ['Deep Learning', 'Neural Networks', 'Vertex AI', 'TensorFlow'],
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
    skills: ['Generative AI', 'Prompt Engineering', 'Ethics in AI', 'Gemini Models'],
  },
  {
    id: 'cert-3',
    title: 'Google IT Support Professional Certificate',
    issuer: 'Google / Coursera',
    status: 'in_progress',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    category: 'IT Support',
    progress: 85,
    current_module: 'System Administration & IT Infrastructure Services',
    skills: ['Troubleshooting', 'Customer Care', 'Networking', 'Linux OS', 'DNS/DHCP'],
  },
  {
    id: 'cert-4',
    title: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google / Coursera',
    status: 'in_progress',
    image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    category: 'Cybersecurity',
    progress: 72,
    current_module: 'Networks & Network Security Analysis',
    skills: ['SIEM Tools', 'Python Security Scripts', 'SQL', 'Intrusion Detection'],
  },
  {
    id: 'cert-5',
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google / Coursera',
    status: 'in_progress',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    category: 'Data',
    progress: 60,
    current_module: 'Process Data from Dirty to Clean',
    skills: ['BigQuery', 'R Programming', 'Tableau', 'Data Cleaning', 'Spreadsheets'],
  },
  {
    id: 'cert-6',
    title: 'Google Digital Marketing & E-Commerce',
    issuer: 'Google / Coursera',
    status: 'in_progress',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    category: 'Marketing',
    progress: 45,
    current_module: 'From Like to Lead: Engaging Customers Online',
    skills: ['Analytics', 'E-Commerce Funnels', 'SEO', 'Email Automation'],
  },
];

const categoryColorMap: Record<Certificate['category'], string> = {
  AI: 'text-violet-400 border-violet-500/30 bg-violet-950/30',
  Cybersecurity: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30',
  'IT Support': 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30',
  Data: 'text-amber-400 border-amber-500/30 bg-amber-950/30',
  Marketing: 'text-pink-400 border-pink-500/30 bg-pink-950/30',
};

export function CertificatesSection() {
  const [activeTab, setActiveTab] = useState<'completed' | 'in_progress'>('completed');

  const filteredItems = INITIAL_CERTIFICATES.filter(
    (cert) => cert.status === activeTab
  );

  return (
    <section id="certifications" className="py-24 bg-slate-950 text-slate-100 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/60 text-xs font-medium text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Accreditations & Continuous Upskilling
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Industry Certifications
          </h2>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base">
            Verified credentials certified by global technology leaders, alongside 
            active specializations currently in progress.
          </p>

          <div className="flex items-center p-1.5 rounded-2xl bg-slate-900 border border-slate-800 mt-6 shadow-inner">
            <button
              onClick={() => setActiveTab('completed')}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'completed' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeTab === 'completed' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-cyan-600 rounded-xl shadow-md"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Completed Credentials ({INITIAL_CERTIFICATES.filter(c => c.status === 'completed').length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab('in_progress')}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'in_progress' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeTab === 'in_progress' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-cyan-600 rounded-xl shadow-md"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Continuous Learning / In Progress ({INITIAL_CERTIFICATES.filter(c => c.status === 'in_progress').length})
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-6 hover:border-slate-700 hover:bg-slate-900/70 transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${categoryColorMap[item.category]}`}>
                      {item.category}
                    </span>

                    {item.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Complete
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400">
                        <Sparkles className="w-3.5 h-3.5" />
                        In Progress ({item.progress}%)
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    Issuer: <span className="text-slate-300">{item.issuer}</span>
                    {item.issue_date && ` • Issued: ${item.issue_date}`}
                  </p>

                  {item.status === 'in_progress' && (
                    <div className="mt-5 space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Current: {item.current_module}</span>
                        <span className="font-semibold text-cyan-400">{item.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 text-[11px] text-slate-300 px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50"
                      >
                        <Tag className="w-2.5 h-2.5 text-slate-500" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  {item.credential_url ? (
                    <a
                      href={item.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Verify Credential
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-500 italic">
                      Credential issued upon course completion
                    </span>
                  )}
                  <span className="text-[11px] text-slate-600 font-mono">ID: {item.id}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
