import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Search, Lock, Cpu, Globe, ChevronRight, BookOpen, Zap, Users, Award, Code2, Eye, Brain, Target, MonitorCheck, ClipboardCheck, Flag, Mail, NetworkIcon } from 'lucide-react';
import maskotImg from '../../assets/Maskot.png';
import sidikJariImg from '../../assets/Sidik Jari.png';
import laptopImg from '../../assets/Laptop.png';
import searchImg from '../../assets/Search.png';
import handImg from '../../assets/Hand.png';
import bookImg from '../../assets/Book.png';

const IgIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.09 * i, duration: 0.75, ease: [.22, 1, .36, 1] } }),
};

const PILLARS = [
  {
    num: '01', Icon: Shield,
    title: 'Cybersecurity Research',
    desc: 'Riset mendalam tentang keamanan siber, baik analisis forensik digital, pengembangan metode deteksi ancaman ataupun serangan siber',
    img: laptopImg,
    tag: 'Core Research'
  },
  {
    num: '02', Icon: Search,
    title: 'Study Group & CTF',
    desc: 'Mentoring atau Belajar keamanan siber dan persiapan kompetisi siber seperti Capture The Flag untuk mahasiswa di telkom university.',
    img: searchImg,
    tag: 'Education'
  },
  {
    num: '03', Icon: Flag,
    title: 'CTF Maker & Competitive',
    desc: 'Membuat soal CTF berkualitas tinggi, mengelola kompetisi siber, dan mengikuti berbagai ajang Capture The Flag secara aktif di tingkat nasional maupun internasional.',
    img: sidikJariImg,
    tag: 'Competition'
  },
];

const EXPERTISE = [
  { Icon: Search, label: 'Digital Forensics', sub: 'Toolkit & Analysis', color: '#3b82f6' },
  { Icon: Shield, label: 'Infrastructure Sec', sub: 'Network Defense', color: '#E8192C' },
  { Icon: Cpu, label: 'Reverse Engineering', sub: 'Malware Analysis', color: '#f59e0b' },
  { Icon: Globe, label: 'CTF Platform', sub: 'Scenario Design', color: '#10b981' },
  { Icon: Eye, label: 'OSINT', sub: 'Open Source Intel', color: '#06b6d4' },
  { Icon: Brain, label: 'AI Security', sub: 'ML Threat Detection', color: '#a855f7' },
  { Icon: Target, label: 'Penetration Testing', sub: 'Ethical Hacking', color: '#ef4444' },
  { Icon: MonitorCheck, label: 'Blue Team / SOC', sub: 'Incident Response', color: '#22d3ee' },
  { Icon: ClipboardCheck, label: 'Security Audit', sub: 'Compliance & Assessment', color: '#84cc16' },
  { Icon: NetworkIcon, label: 'Network Security', sub: 'Network Security', color: '#cc1616ff' },
];

const PORTALS = [
  { num: '01', label: 'Tim Struktural', desc: 'Kenali dosen pembina dan pengurus inti laboratorium Foresty.', path: '/team', Icon: Users },
  { num: '02', label: 'Prestasi', desc: 'Rekam jejak kemenangan di berbagai kompetisi keamanan siber nasional & internasional.', path: '/prestasi', Icon: Award },
  { num: '03', label: 'Penghargaan Lab', desc: 'Pengakuan institusional dari lembaga atas kontribusi dari asisten laboratorium kami.', path: '/awards', Icon: Zap },
  { num: '04', label: 'Proyek & Riset', desc: 'Publikasi jurnal, paper ilmiah, dan project yang berfokus pada keamanan siber dan forensik digital.', path: '/projects', Icon: BookOpen },
];

const MARQUEE = ['Cybersecurity', 'Digital Forensics', 'Penetration Testing', 'CTF Champions', 'AI Security', 'Malware Analysis', 'OSINT', 'Incident Response', 'Ethical Hacking', 'Reverse Engineering', 'Network Security'];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#06060E] text-[#E8E8F2] overflow-x-hidden">
      <div className="scanline noise" />

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-glow">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

        {/* Decorative particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="particle absolute w-1 h-1 rounded-full bg-red-500/30"
              style={{
                left: `${15 + i * 14}%`,
                top: `${20 + (i % 3) * 20}%`,
                '--dur': `${5 + i}s`,
                '--delay': `${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        {/* Floating assets */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <img src={sidikJariImg} alt="" className="absolute top-[10%] right-[5%] w-48 opacity-[.18] float-rot glow-img" />
          <img src={searchImg} alt="" className="absolute bottom-[18%] right-[10%] w-36 opacity-[.15] float-y glow-img" style={{ animationDelay: '1.5s' }} />
          <img src={handImg} alt="" className="absolute bottom-[6%] left-[3%] w-44 opacity-[.1] float-sx" />
          <img src={bookImg} alt="" className="absolute top-[18%] left-[4%] w-32 opacity-[.12] float-y" style={{ animationDelay: '2.2s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 pt-28 pb-20">
          {/* Main headline */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="mb-5">
            <h1 className="font-display font-extrabold tracking-tight leading-[.95] md:leading-[.9]">
              <span className="block text-white" style={{ fontSize: 'clamp(42px, 11vw, 110px)' }}>FORESTY</span>
              <span className="block text-red-shine" style={{ fontSize: 'clamp(42px, 11vw, 110px)' }}>LAB.</span>
            </h1>
          </motion.div>

          {/* Subtitle below headline */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show" className="mb-10 max-w-2xl">
            <p className="text-[11px] font-mono-lab text-red-400/70 uppercase tracking-[0.22em] mb-4">
              Forensics &amp; Security Laboratory · Telkom University
            </p>
            <p className="text-zinc-400 text-base md:text-xl leading-relaxed font-light">
              Laboratorium{' '}
              <span className="font-semibold text-white">riset siber</span> dan{' '}
              <span className="font-semibold text-white">forensik digital</span> dari Fakultas Informatika Telkom University — berfokus pada{' '}
              <span className="font-semibold text-white">riset ilmiah</span>,{' '}
              <span className="font-semibold text-white">mentoring</span>, dan{' '}
              <span className="font-semibold text-white">kompetisi</span> keamanan siber.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap items-center gap-4">
            <Link to="/team" className="btn-primary text-sm">
              Jelajahi Tim <ChevronRight size={15} />
            </Link>
            <Link to="/projects" className="btn-ghost text-sm">
              Lihat Proyek
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] font-mono-lab tracking-[0.35em] text-zinc-600 uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 1.7, repeat: Infinity }}
            className="w-[1px] h-10 bg-gradient-to-b from-red-600 to-transparent" />
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────── */}
      <div className="relative py-4 bg-[#0A0A16] border-y border-white/[.04] overflow-hidden">
        <div className="flex marquee-inner whitespace-nowrap gap-0 w-max">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-8 text-[11px] font-mono-lab font-bold uppercase tracking-[0.18em] text-zinc-700 hover:text-red-500 transition-colors cursor-default">
              <span className="w-1 h-1 rounded-full bg-red-700/60" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── THREE PILLARS ────────────────────── */}
      <section className="py-28 md:py-36 bg-[#06060E]">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="font-display font-extrabold tracking-tight text-4xl md:text-6xl text-white leading-tight">
                Apa yang<br />
                <span className="text-red-shine">Kami Lakukan?</span>
              </h2>
              <p className="text-zinc-500 max-w-sm leading-relaxed text-sm md:text-base">
                Tiga pilar utama yang menopang seluruh kegiatan riset, pendidikan, dan pengembangan kompetensi kami.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * .12, duration: .7, ease: [.22, 1, .36, 1] }}
                className="card group p-7 relative overflow-hidden corner-tl corner-br"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-600 rounded-t-[20px]"
                  style={{ background: 'linear-gradient(90deg,#E8192C,transparent)' }} />

                <img src={item.img} alt="" className="absolute -bottom-4 -right-4 w-32 opacity-[.06] group-hover:opacity-[.11] transition-opacity duration-500 pointer-events-none select-none" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(232,25,44,0.12)', border: '1px solid rgba(232,25,44,0.22)' }}>
                      <item.Icon size={22} className="text-red-500" />
                    </div>
                    <div className="text-right">
                      <span className="font-display font-black text-6xl text-white/[.04] group-hover:text-white/[.08] transition-colors leading-none select-none block">{item.num}</span>
                      <span className="code-chip text-[9px]">{item.tag}</span>
                    </div>
                  </div>
                  <h3 className="text-[18px] font-bold text-white mb-3 group-hover:text-red-100 transition-colors leading-snug">{item.title}</h3>
                  <p className="text-zinc-500 text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERTISE GRID ──────────────────── */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-[#0A0A16]">
        <div className="absolute inset-0 bg-dots opacity-25 pointer-events-none" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-red-600/6 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">Area Keahlian Kami</h2>
            <p className="text-zinc-600 max-w-md mx-auto text-sm leading-relaxed">
              Spektrum kompetensi teknis yang kami kembangkan secara konsisten melalui riset dan praktik nyata.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {EXPERTISE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .055, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="card group p-5 flex flex-col items-center text-center gap-3 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                  <item.Icon size={20} style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white mb-0.5 group-hover:text-red-100 transition-colors leading-snug">{item.label}</div>
                  <div className="text-[10px] font-mono-lab text-zinc-600">{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTAL / EXPLORE ────────────────── */}
      <section className="py-28 md:py-36 bg-[#06060E] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/7 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10">
          {/* Centered header */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="divider-center mb-6" />
            <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4 leading-tight">
              Jelajahi <span className="text-red-shine">Foresty Lab</span>
            </h2>
            <p className="text-zinc-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
              Akses informasi lengkap tentang tim, prestasi, penghargaan, dan riset-riset unggulan kami.
            </p>
          </motion.div>

          {/* Big centered portal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PORTALS.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .1, duration: 0.6, ease: [.22, 1, .36, 1] }}
                whileHover={{ y: -8 }}
              >
                <Link to={m.path} className="card group flex flex-col items-center text-center p-8 gap-5 hover:shadow-red block transition-all duration-400 relative overflow-hidden">
                  {/* top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-t-[20px]"
                    style={{ background: 'linear-gradient(90deg,#E8192C,transparent)' }} />

                  {/* Num watermark */}
                  <span className="absolute bottom-4 right-5 font-display font-black text-7xl text-white/[.035] group-hover:text-white/[.065] transition-colors leading-none select-none">{m.num}</span>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(232,25,44,0.1)', border: '1px solid rgba(232,25,44,0.22)' }}>
                    <m.Icon size={28} className="text-red-500 group-hover:text-red-400 transition-colors" />
                  </div>

                  {/* Label */}
                  <div className="relative z-10">
                    <div className="text-base font-bold text-white group-hover:text-red-200 transition-colors mb-2">{m.label}</div>
                    <p className="text-zinc-500 text-[12px] leading-relaxed">{m.desc}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center gap-1.5 text-[11px] font-mono-lab text-red-800 group-hover:text-red-500 transition-colors mt-auto">
                    <span className="w-5 h-px bg-current" /> Lihat Detail
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT & COLLABORATION ────────── */}
      <section className="py-24 md:py-32 relative bg-[#0A0A16]">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="card relative overflow-hidden p-8 md:p-16 border-white/[.04] bg-gradient-to-br from-[#0D0D1A] to-[#080812]">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[10px] font-mono-lab tracking-[0.3em] uppercase text-red-500 mb-6 block">Contact & Partnership</span>
                <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-8 leading-tight">
                  Tertarik <span className="text-red-shine">bekerja sama?</span>
                </h2>
                <div className="flex flex-wrap gap-4">
                  <a href="https://www.instagram.com/foresty.laboratory/" target="_blank" rel="noopener noreferrer" className="btn-primary px-8">
                    <IgIcon size={18} /> DM ke Instagram
                  </a>
                  <Link to="/team" className="btn-ghost">
                    Struktur Lab
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Kolaborasi Riset', desc: 'Join proyek penelitian siber skala nasional/internasional.', icon: Brain },
                  { label: 'Kerja Sama Industri', desc: 'Solusi teknis, audit keamanan, dan konsultasi profesional.', icon: Shield },
                  { label: 'Kolaborasi Event', desc: 'Penyelenggaraan event keamanan siber, workshop, dan webinar.', icon: Users },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/[.02] border border-white/[.05] hover:border-red-500/20 transition-all group">
                    <item.icon size={24} className="text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white font-bold text-sm mb-2">{item.label}</h3>
                    <p className="text-zinc-600 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
