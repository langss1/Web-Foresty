import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronRight } from 'lucide-react';
import logoImg from '../../assets/Logo.png';

const NAV = [
  { path: '/',          label: 'Beranda',      labelEn: 'Home' },
  { path: '/team',      label: 'Struktural',   labelEn: 'Team' },
  { path: '/prestasi',  label: 'Prestasi',     labelEn: 'Achievement' },
  { path: '/projects',  label: 'Proyek',       labelEn: 'Projects' },
  { path: '/awards',    label: 'Penghargaan',  labelEn: 'Awards' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 24);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Scroll Progress */}
      <div className="fixed top-0 inset-x-0 z-[60] h-[2px] bg-transparent">
        <motion.div
          className="h-full origin-left"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #E8192C, #FF6070)',
          }}
          transition={{ type: 'spring', stiffness: 100 }}
        />
      </div>

      {/* Main Nav */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [.22, 1, .36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#06060E]/96 backdrop-blur-[28px] border-b border-white/[.05] shadow-[0_8px_48px_rgba(0,0,0,.7)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-[72px] flex items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600/30 blur-2xl rounded-full scale-[1.6] group-hover:bg-red-600/50 transition-all duration-700 pointer-events-none" />
              <img src={logoImg} alt="Foresty" className="relative h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="hidden sm:block leading-none">
              <div className="text-white font-bold text-[13px] tracking-[0.2em] uppercase font-display">FORESTY</div>
              <div className="text-[9px] font-mono-lab tracking-[0.25em] text-red-400/70 uppercase mt-0.5">Forensics &amp; Security Lab</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(n => {
              const active = pathname === n.path;
              return (
                <Link
                  key={n.path} to={n.path}
                  className={`relative px-4 py-2 text-[12px] font-semibold rounded-lg transition-all duration-200 group ${
                    active ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/[.07] border border-white/[.1] rounded-lg"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {active && <span className="w-1 h-1 rounded-full bg-red-500 shadow-[0_0_6px_rgba(232,25,44,0.9)]" />}
                    {n.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/[.08] text-zinc-400 hover:text-white hover:border-red-500/35 hover:bg-red-500/8 transition-all"
            aria-label="Toggle navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={open ? 'x' : 'm'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: .15 }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: .96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: .96 }}
            transition={{ duration: .25, ease: [.22, 1, .36, 1] }}
            className="fixed top-[80px] inset-x-4 z-40 bg-[#0A0A16]/98 backdrop-blur-[32px] border border-white/[.08] rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,.8)] overflow-hidden md:hidden"
          >
            {/* Top accent line */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

            {/* Nav items */}
            <div className="p-5 space-y-2">
              {NAV.map((n, i) => {
                const active = pathname === n.path;
                return (
                  <motion.div
                    key={n.path}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * .045, duration: 0.3, ease: 'easeOut' }}
                  >
                    <Link
                      to={n.path}
                      className={`flex items-center justify-between px-5 py-4 rounded-2xl text-base font-bold transition-all ${
                        active
                          ? 'bg-red-600/15 text-white border border-red-600/30 shadow-[0_0_20px_rgba(232,25,44,0.1)]'
                          : 'text-zinc-400 hover:text-white hover:bg-white/[.04]'
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        {active && (
                          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(232,25,44,1)]" />
                        )}
                        <span>
                          <span className="block">{n.label}</span>
                          <span className="block text-[11px] font-mono-lab text-zinc-600 mt-0.5 tracking-widest">{n.labelEn}</span>
                        </span>
                      </span>
                      <ChevronRight size={18} className={active ? "text-red-500" : "text-zinc-700"} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer info */}
            <div className="px-4 pb-4 flex items-center gap-2 text-[10px] font-mono-lab text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Foresty Lab · Telkom University · Active
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
