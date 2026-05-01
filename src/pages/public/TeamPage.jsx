import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { UserCircle, GraduationCap, Mail, Search, Star, ExternalLink } from 'lucide-react';
import sidikJariImg from '../../assets/Sidik Jari.png';

/* ── Social SVG Icons ── */
const GithubIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>;
const LinkedinIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
const InstagramIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;

const toDriveImg = (url, name) => {
  if (name) {
    // Specific Overrides for Advisors
    if (name.includes('Vera Suryani')) return '/assets/team/Vera.png';
    if (name.includes('Aulia Arif'))  return '/assets/team/aulia.png';
    if (name.includes('Gian Maxmillian')) return '/assets/team/gian.jpg';

    const parts = name.split(' ');
    let firstName = parts[0].toLowerCase();
    // Handle 'Muhammad' prefix specifically
    if (firstName === 'muhammad' && parts.length > 1) {
      firstName = parts[1].toLowerCase();
    }
    return `/assets/team/${firstName}.JPG`;
  }
  if (!url) return null;
  const m = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/) || url.match(/id=([a-zA-Z0-9_-]{25,})/);
  return m?.[1] ? `https://lh3.googleusercontent.com/d/${m[1]}=s500` : url;
};

const MOCK = [
  /* ── RESEARCH ADVISORS ── */
  { id: 1, name: 'Assoc. Prof. Dr. Vera Suryani, S.T., M.T.', role: 'Dosen Pembina', department: 'RESEARCH_ADVISORS', prodi: 'S1 Informatika', tags: ['Computer Network', 'Internet of Things'], scholar: 'https://scholar.google.com/citations?hl=id&user=fphVMf8AAAAJ', sinta: 'https://sinta.kemdikbud.go.id/authors/profile/28717' },
  { id: 3, name: 'Gian Maxmillian Firdaus, S.Kom., M.Kom.', role: 'Lecture', department: 'RESEARCH_ADVISORS', prodi: 'S1 Informatika', tags: ['Machine Learning', 'Cybersecurity'], scholar: 'https://scholar.google.com/citations?user=IMde22kAAAAJ', sinta: 'https://sinta.kemdikbud.go.id/authors/profile/6979746' },
  { id: 2, name: 'Ir. Aulia Arif Wardana, S.Kom., M.MT.', role: 'Lecture', department: 'RESEARCH_ADVISORS', prodi: 'S1 Informatika', tags: ['Network Security', 'Intrusion Detection', 'Distributed Ledger'], scholar: 'https://scholar.google.com/citations?user=VeOwJAsAAAAJ', sinta: 'https://sinta.kemdikbud.go.id/authors/profile/6722822' },
  /* ── EXECUTIVE BOARD ── */
  { id: 4, name: 'Faisal Ihsan Santoso', role: 'Ketua', department: 'EXECUTIVE_BOARD', tags: ['CTF', 'Bug Hunter'], linkedin: 'https://id.linkedin.com/in/faisalsan', instagram: 'https://www.instagram.com/callmecal.ok' },
  { id: 5, name: 'Gilang Wasis Wicaksono', role: 'Wakil Ketua', department: 'EXECUTIVE_BOARD', tags: ['Cyber Security', 'OSINT', 'IT Audit', 'AI', 'Machine Learning', 'Fullstack Dev'], linkedin: 'https://www.linkedin.com/in/gilang-wasis-wicaksono2/', github: 'https://github.com/langss1' },
  { id: 6, name: 'Arina Rahmania Nabila', role: 'Sekretaris', department: 'EXECUTIVE_BOARD', tags: [] },
  { id: 7, name: 'Danish Felicitia', role: 'Bendahara', department: 'EXECUTIVE_BOARD', tags: ['OSINT', 'Cryptographic'], linkedin: 'https://www.linkedin.com/in/danish-felicitia', github: 'https://github.com/fairycookies', instagram: 'https://www.instagram.com/moonvaleo' },
  /* ── ACADEMIC ── */
  { id: 8, name: 'Ramadhan Tangguh Defender', role: 'Koordinator Akademik', department: 'ACADEMIC', tags: [] },
  { id: 9, name: 'Muhammad Rafli Ardiansyah', role: 'Member', department: 'ACADEMIC', tags: ['Cybersecurity'] },
  { id: 10, name: 'Fityah Bayodiansyah Harahap', role: 'Member', department: 'ACADEMIC', tags: ['Infrastructure Management'], linkedin: 'https://www.linkedin.com/in/fityah-bayodiansyah', github: 'https://github.com/BbayuGt' },
  { id: 11, name: 'Muhammad Nadhif Auliya Zaki', role: 'Member', department: 'ACADEMIC', tags: [] },
  { id: 12, name: 'Harsya Rahmantyo Wibowo', role: 'Member', department: 'ACADEMIC', tags: [] },
  /* ── MEDIA ── */
  { id: 13, name: 'Abdul Jabbar Hawali Al Dzhabi', role: 'Koordinator Media', department: 'MEDIA', tags: ['Desain Grafis', 'Cybersecurity', 'CTF'], linkedin: 'https://www.linkedin.com/in/abduljabbarhawalialdzhabi', github: 'https://github.com/Xyzet29', instagram: 'https://www.instagram.com/abdoeeel_/' },
  { id: 14, name: 'Fazli Rabbi', role: 'Member', department: 'MEDIA', tags: ['Design', 'Video Editing', 'Web Dev', 'Laravel'], linkedin: 'https://www.linkedin.com/in/fazli-rabbi', github: 'https://github.com/lately-dev', instagram: 'https://www.instagram.com/fazli.r2/' },
  { id: 15, name: 'Arie Farchan Fyrzatullah', role: 'Member', department: 'MEDIA', tags: [], linkedin: 'https://www.linkedin.com/in/fyrzatullah99', github: 'https://github.com/Pirjakun' },
  { id: 16, name: 'Frizanka Aryaguna', role: 'Member', department: 'MEDIA', tags: ['Forensics', 'Cryptography'], linkedin: 'https://id.linkedin.com/in/frizanka-aryaguna', github: 'https://github.com/Zunnkuu', instagram: 'https://www.instagram.com/zankaarya_/' },
  /* ── HR ── */
  { id: 17, name: 'Farhan Muamar Fawwaz', role: 'Koordinator HR', department: 'HR', tags: [] },
  { id: 18, name: 'Zaidan Kamil Munadi', role: 'Member', department: 'HR', tags: ['Cyber Security', 'Web Development'], linkedin: 'https://www.linkedin.com/in/zaidan-kamil-munadi', github: 'https://github.com/Danzz2706', instagram: 'https://www.instagram.com/zaidanmunadi_/' },
  { id: 19, name: 'Muhammad Amir Syarifuddin', role: 'Member', department: 'HR', tags: [] },
  { id: 20, name: 'Paul Daniel Jagasa Ginting', role: 'Member', department: 'HR', tags: [] },
];

const DEPTS = [
  { key: 'ALL', label: 'Semua' },
  { key: 'RESEARCH_ADVISORS', label: 'Advisors' },
  { key: 'EXECUTIVE_BOARD', label: 'Executive' },
  { key: 'ACADEMIC', label: 'Akademik' },
  { key: 'MEDIA', label: 'Media' },
  { key: 'HR', label: 'HR' },
];

const DC = {
  RESEARCH_ADVISORS: { dot: '#f59e0b', bg: 'rgba(245,158,11,.1)', border: 'rgba(245,158,11,.28)', text: '#f59e0b', label: 'Advisor' },
  EXECUTIVE_BOARD: { dot: '#E8192C', bg: 'rgba(232,25,44,.1)', border: 'rgba(232,25,44,.28)', text: '#FF6070', label: 'Executive' },
  ACADEMIC: { dot: '#3b82f6', bg: 'rgba(59,130,246,.1)', border: 'rgba(59,130,246,.28)', text: '#60a5fa', label: 'Academic' },
  MEDIA: { dot: '#8b5cf6', bg: 'rgba(139,92,246,.1)', border: 'rgba(139,92,246,.28)', text: '#a78bfa', label: 'Media' },
  HR: { dot: '#10b981', bg: 'rgba(16,185,129,.1)', border: 'rgba(16,185,129,.28)', text: '#34d399', label: 'HR' },
};
const C = (d) => DC[d] || DC.ACADEMIC;

function AdvisorCard({ m, i }) {
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const img = toDriveImg(m.photo_url, m.name);
  const isVera = m.name.includes('Vera');
  
  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*.1, duration:.55 }}
      className={`relative rounded-[24px] overflow-hidden group border transition-all duration-500 bg-[#0A0A16] shadow-xl hover:shadow-red/5 ${isVera ? 'border-red-500/30' : 'border-white/[.05]'}`}>
      
      <div className={`absolute top-0 left-0 right-0 h-24 opacity-[0.03] pointer-events-none ${isVera ? 'bg-red-500' : 'bg-white'}`} style={{ maskImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', maskSize: '12px 12px' }} />

      <div className="relative z-10 flex flex-col items-center p-6 text-center">
        <div className="relative mb-5">
          <div className={`absolute -inset-1 rounded-full blur-md opacity-20 transition-opacity group-hover:opacity-40 ${isVera ? 'bg-red-500' : 'bg-zinc-500'}`} />
          <div className={`relative w-28 h-28 rounded-full overflow-hidden border-2 ${isVera ? 'border-red-500/50' : 'border-white/10'} bg-zinc-900/50`}>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 border-2 border-red-600/20 rounded-full" />
                  <div className="absolute inset-0 border-2 border-t-red-600 rounded-full animate-spin shadow-[0_0_10px_rgba(220,38,38,0.3)]" />
                </div>
              </div>
            )}
            {img ? (
              <img src={img} alt={m.name} 
                onLoad={() => setLoading(false)}
                className={`w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 ease-out ${loading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
                onError={e=>{setLoading(false); e.target.src = 'https://ui-avatars.com/api/?name='+encodeURIComponent(m.name)+'&background=18181b&color=71717a&size=512'}} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                <UserCircle size={48} className="text-zinc-800" />
              </div>
            )}
          </div>
          <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-widest shadow-lg ${isVera ? 'bg-red-600' : 'bg-zinc-800'}`}>
            {m.role}
          </div>
        </div>

        {/* Info */}
        <h3 className="font-display font-extrabold text-white text-base md:text-lg mb-1 leading-tight group-hover:text-red-400 transition-colors h-12 flex items-center justify-center">
          {m.name}
        </h3>
        
        <div className="flex flex-col items-center gap-0.5 mb-4">
          <div className="flex items-center gap-1 text-[10px] md:text-[11px] text-zinc-500">
            <GraduationCap size={10} className="text-red-500/60"/>
            {m.prodi}
          </div>
          <span className="text-[8px] md:text-[9px] font-mono-lab text-zinc-700 uppercase tracking-widest">Telkom University</span>
        </div>

        {/* Compact Tags */}
        <div className="flex flex-wrap justify-center gap-1 mb-4 min-h-[32px]">
          {(showAll ? m.tags : m.tags?.slice(0, 2))?.map(t => (
            <span key={t} className="px-2 py-0.5 bg-white/[.02] text-zinc-500 text-[8px] md:text-[9px] font-bold rounded-md uppercase tracking-wide border border-white/[.04]">{t}</span>
          ))}
          {!showAll && m.tags?.length > 2 && (
            <button onClick={() => setShowAll(true)} className="text-[8px] font-bold text-zinc-700 hover:text-white transition-colors">+{m.tags.length - 2}</button>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 w-full">
          {m.scholar && (
            <a href={m.scholar} target="_blank" rel="noopener noreferrer" 
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-amber-500/5 text-amber-500/80 text-[10px] font-bold hover:bg-amber-500/10 transition-all border border-amber-500/10">
              <ExternalLink size={10} /> Scholar
            </a>
          )}
          {m.sinta && (
            <a href={m.sinta} target="_blank" rel="noopener noreferrer" 
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-500/5 text-blue-500/80 text-[10px] font-bold hover:bg-blue-500/10 transition-all border border-blue-500/10">
              <ExternalLink size={10} /> SINTA
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function MemberCard({ m, i }) {
  const c = C(m.department);
  const img = toDriveImg(m.photo_url, m.name);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .95 }}
      transition={{ delay: i * .055, duration: .5 }} whileHover={{ y: -10 }}
      className="flex flex-col group h-full">
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-[#0A0A16] shadow-2xl border border-white/[.03]">
        {loading && img && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#0A0A16]">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 border-2 border-red-600/10 rounded-full" />
              <div className="absolute inset-0 border-2 border-t-red-600 rounded-full animate-spin shadow-[0_0_15px_rgba(220,38,38,0.2)]" />
            </div>
          </div>
        )}
        {img ? (
          <img src={img} alt={m.name} 
            onLoad={() => setLoading(false)}
            className={`w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out ${loading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
            onError={e => { setLoading(false); e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(m.name) + '&background=18181b&color=a1a1aa&size=512' }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900">
            <UserCircle size={80} className="text-zinc-800" />
          </div>
        )}
        {/* Overlay info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <div className="flex items-center gap-3">
            {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-white hover:bg-blue-600 transition-all"><LinkedinIcon /></a>}
            {m.github && <a href={m.github} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-white hover:bg-zinc-800 transition-all"><GithubIcon /></a>}
            {m.instagram && <a href={m.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-white hover:bg-pink-600 transition-all"><InstagramIcon /></a>}
          </div>
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[8px] font-bold uppercase tracking-widest">{c.label}</div>
      </div>

      <div className="px-1 mt-4">
        <h3 className="text-white font-display font-extrabold text-[13px] md:text-xl mb-1 leading-tight group-hover:text-red-400 transition-colors uppercase tracking-tight">{m.name}</h3>
        <p className="text-zinc-500 font-mono-lab text-[8px] md:text-[10px] uppercase tracking-[0.1em] font-medium">{m.role || 'Member'}</p>

        {/* Tags hidden on mobile for clean Danantara-style look */}
        <div className="hidden md:flex flex-wrap gap-1.5 mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
          {(showAll ? m.tags : m.tags?.slice(0, 2))?.map(t => (
            <span key={t} className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">{t} •</span>
          ))}
          {!showAll && m.tags?.length > 2 && (
            <button onClick={(e) => { e.preventDefault(); setShowAll(true); }} className="text-[9px] font-bold text-zinc-700 uppercase tracking-wider hover:text-red-500 transition-colors">+{m.tags.length - 2} more</button>
          )}
          {showAll && m.tags?.length > 2 && (
            <button onClick={(e) => { e.preventDefault(); setShowAll(false); }} className="text-[9px] font-bold text-zinc-700 uppercase tracking-wider hover:text-white transition-colors">less</button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDept, setActiveDept] = useState('ALL');
  const [searchQ, setSearchQ] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('struktural').select('*').order('created_at');
        if (error) throw error;
        if (data && data.length > 0) {
          setMembers(data.map(d => ({ ...d, tags: Array.isArray(d.tags) ? d.tags : d.skills?.split?.(',').map(s => s.trim()).filter(Boolean) || [] })));
        } else {
          // If the table exists but is empty, we still fallback to MOCK for now 
          // because the user might not have set up the 'struktural' table yet.
          // But we'll log it.
          setMembers(MOCK);
        }
      } catch (err) { 
        console.error("Team fetch error:", err);
        setMembers(MOCK); 
      }
      setLoading(false);
    };
    load();
    window.scrollTo(0, 0);
  }, []);

  const advisors = members.filter(m => m.department === 'RESEARCH_ADVISORS');
  const filtered = members
    .filter(m => activeDept === 'ALL' || m.department === activeDept)
    .filter(m => !searchQ || m.name?.toLowerCase().includes(searchQ.toLowerCase()) || m.role?.toLowerCase().includes(searchQ.toLowerCase()));
  const fAdvisors = filtered.filter(m => m.department === 'RESEARCH_ADVISORS');
  const fMembers = filtered.filter(m => m.department !== 'RESEARCH_ADVISORS');

  return (
    <div className="min-h-screen bg-[#06060E] text-[#E8E8F2]">
      <div className="scanline" />

      {/* HERO */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/7 blur-[160px] rounded-full pointer-events-none" />
        <img src={sidikJariImg} alt="" className="absolute bottom-0 right-8 w-52 opacity-[.055] float-rot pointer-events-none select-none hidden lg:block" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10">
          <motion.p initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-mono-lab tracking-[0.25em] uppercase text-red-500 mb-3">
            Foresty Lab · Telkom University · 2024/2025
          </motion.p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }}
                className="font-display font-extrabold tracking-tight text-4xl md:text-7xl text-white mb-4 leading-[.92]">
                Struktural<br /><span className="text-red-shine">Organisasi</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 }}
                className="text-zinc-500 max-w-lg leading-relaxed text-sm md:text-base">
                Tim multidisiplin dari peneliti, insinyur, dan kreator yang bersatu dalam misi keamanan siber, forensik digital, dan pengembangan kompetensi mahasiswa Indonesia.
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .22 }}
              className="flex items-center gap-8 shrink-0">
              {[
                { val: advisors.length, label: 'Dosen Pembina' },
                { val: members.length, label: 'Total Anggota' },
                { val: new Set(members.map(m => m.department)).size, label: 'Divisi' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="stat-number text-4xl md:text-5xl">{s.val}</div>
                  <div className="text-[9px] font-mono-lab text-zinc-600 uppercase tracking-[0.2em] mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-14">
        {loading ? (
          <div className="flex flex-col items-center py-40 gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-red-600/20 border-t-red-600 animate-spin" />
            <p className="text-[11px] font-mono-lab text-zinc-700 uppercase tracking-widest animate-pulse">Memuat Data...</p>
          </div>
        ) : (
          <div className="space-y-20">
            {/* 1. Research Advisors */}
            {members.filter(m => m.department === 'RESEARCH_ADVISORS').length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(180deg,#f59e0b,transparent)' }} />
                  <div>
                    <h2 className="font-display font-bold text-xl text-white uppercase tracking-wider">Research Advisors</h2>
                    <p className="text-[10px] font-mono-lab text-zinc-600 mt-0.5">Dosen Pembina Laboratorium Foresty</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {members.filter(m => m.department === 'RESEARCH_ADVISORS').map((m, i) => (
                    <AdvisorCard key={m.id} m={m} i={i} />
                  ))}
                </div>
              </section>
            )}

            {/* 2. Executive Board */}
            {members.filter(m => m.department === 'EXECUTIVE_BOARD').length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(180deg,#E8192C,transparent)' }} />
                  <div>
                    <h2 className="font-display font-bold text-xl text-white uppercase tracking-wider">Executive Board</h2>
                    <p className="text-[10px] font-mono-lab text-zinc-600 mt-0.5">Pengurus Inti Laboratorium</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                  {members.filter(m => m.department === 'EXECUTIVE_BOARD').map((m, i) => (
                    <MemberCard key={m.id} m={m} i={i} />
                  ))}
                </div>
              </section>
            )}

            {/* 3. Academic Division */}
            {members.filter(m => m.department === 'ACADEMIC').length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(180deg,#3b82f6,transparent)' }} />
                  <div>
                    <h2 className="font-display font-bold text-xl text-white uppercase tracking-wider">Academic Division</h2>
                    <p className="text-[10px] font-mono-lab text-zinc-600 mt-0.5">Divisi Pengembangan & Riset</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                  {members.filter(m => m.department === 'ACADEMIC').map((m, i) => (
                    <MemberCard key={m.id} m={m} i={i} />
                  ))}
                </div>
              </section>
            )}

            {/* 4. Media Division */}
            {members.filter(m => m.department === 'MEDIA').length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(180deg,#8b5cf6,transparent)' }} />
                  <div>
                    <h2 className="font-display font-bold text-xl text-white uppercase tracking-wider">Media Division</h2>
                    <p className="text-[10px] font-mono-lab text-zinc-600 mt-0.5">Divisi Publikasi & Kreatif</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                  {members.filter(m => m.department === 'MEDIA').map((m, i) => (
                    <MemberCard key={m.id} m={m} i={i} />
                  ))}
                </div>
              </section>
            )}

            {/* 5. HR Division */}
            {members.filter(m => m.department === 'HR').length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(180deg,#10b981,transparent)' }} />
                  <div>
                    <h2 className="font-display font-bold text-xl text-white uppercase tracking-wider">Human Resource Division</h2>
                    <p className="text-[10px] font-mono-lab text-zinc-600 mt-0.5">Divisi Pengembangan Sumber Daya</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                  {members.filter(m => m.department === 'HR').map((m, i) => (
                    <MemberCard key={m.id} m={m} i={i} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
