import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Briefcase, Search, ExternalLink, Calendar, Users, ShieldAlert, Trophy, BookOpen } from 'lucide-react';

const toDrive = (url) => {
  if (!url) return null;
  const m = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/) || url.match(/id=([a-zA-Z0-9_-]{25,})/);
  return m?.[1] ? `https://lh3.googleusercontent.com/d/${m[1]}=s800` : url;
};

const MOCK = (table) => [
  {
    id: 'mk1',
    title: table==='prestasi' ? 'Juara 1 Cyber Defense Competition 2024' : table==='awards' ? 'Best Research Lab Award 2024' : 'Advanced Cryptography Engine',
    description: 'Kompetisi keamanan siber tingkat internasional yang diikuti oleh lebih dari 500 tim dari 30 negara. Tim Foresty berhasil merebut posisi teratas.',
    members: 'Muhammad Faris, Gilang Ramadhan, Rizky Pratama',
    category: 'INTERNATIONAL',
    created_at: new Date().toISOString(),
    photo_url: null,
  },
  {
    id: 'mk2',
    title: table==='prestasi' ? 'Medali Emas Hackathon Nasional 2024' : table==='awards' ? 'Innovation Excellence Award' : 'Zero-Day Vulnerability Scanner',
    description: 'Hackathon berskala nasional dengan tema keamanan infrastruktur digital. Tim mengembangkan solusi deteksi ancaman berbasis AI.',
    members: 'Andi Kurniawan, Budi Santoso',
    category: 'NATIONAL',
    created_at: new Date(Date.now()-86400000*30).toISOString(),
    photo_url: null,
  },
  {
    id: 'mk3',
    title: table==='prestasi' ? 'Top 10 CTF Asia-Pacific 2023' : table==='awards' ? 'Best Student Lab Award' : 'OSINT Intelligence Framework',
    description: 'Kompetisi CTF regional Asia-Pasifik yang mempertemukan tim-tim terbaik dari seluruh kawasan. Foresty Lab masuk 10 besar.',
    members: 'Dina Aulia, Reza Hakim, Citra Dewi',
    category: 'REGIONAL',
    created_at: new Date(Date.now()-86400000*60).toISOString(),
    photo_url: null,
  },
];

const CFG = {
  prestasi: { Icon: Trophy,    label: 'Prestasi',       color: '#f59e0b', glow: 'rgba(245,158,11,.08)', border: 'rgba(245,158,11,.22)', heroGlow: '#f59e0b', desc: 'Rekam jejak kemenangan kompetisi keamanan siber tim Foresty Lab.' },
  projects:  { Icon: BookOpen,  label: 'Proyek & Riset', color: '#3b82f6', glow: 'rgba(59,130,246,.08)',  border: 'rgba(59,130,246,.22)',  heroGlow: '#3b82f6', desc: 'Publikasi ilmiah, tools riset, dan kolaborasi proyek unggulan.' },
  awards:    { Icon: Award,     label: 'Penghargaan',    color: '#E8192C', glow: 'rgba(232,25,44,.08)',   border: 'rgba(232,25,44,.22)',   heroGlow: '#E8192C', desc: 'Pengakuan institusional atas kontribusi dan inovasi laboratorium.' },
};

const CAT_CFG = {
  INTERNATIONAL: { bg:'rgba(245,158,11,.12)', border:'rgba(245,158,11,.32)', text:'#f59e0b', icon:'🌐' },
  NATIONAL:      { bg:'rgba(59,130,246,.12)',  border:'rgba(59,130,246,.32)',  text:'#60a5fa', icon:'🇮🇩' },
  REGIONAL:      { bg:'rgba(16,185,129,.12)',  border:'rgba(16,185,129,.32)',  text:'#34d399', icon:'📍' },
};
const getCat = (c) => CAT_CFG[c] || { bg:'rgba(255,255,255,.04)', border:'rgba(255,255,255,.08)', text:'rgba(255,255,255,.4)', icon:'•' };

/* avatar initials from name list */
function MemberAvatars({ names }) {
  if (!names) return null;
  const arr = names.split(',').map(n => n.trim()).filter(Boolean);
  return (
    <div className="flex flex-col gap-1.5 mt-0.5">
      {arr.slice(0, 3).map((n, idx) => (
        <div key={idx} className="flex items-center gap-2 group/member">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center text-[8px] font-bold text-white uppercase shrink-0 shadow-sm group-hover/member:border-red-500/50 transition-colors">
            {n.split(' ').map(w=>w[0]).join('').slice(0,2)}
          </div>
          <span className="text-[11px] font-medium text-zinc-400 group-hover/member:text-white transition-colors truncate">{n}</span>
        </div>
      ))}
      {arr.length > 3 && (
        <div className="pl-1 text-[9px] font-bold text-zinc-600 italic">
          + {arr.length - 3} lainnya
        </div>
      )}
    </div>
  );
}

function DataCard({ item, cfg, i, table }) {
  const title = item.title_achievement || item.title || item.name || 'Untitled';
  const desc  = item.description || item.competition_name || item.institution || '';
  const names = item.members || item.contributors || '';
  const img   = toDrive(item.photo_url);
  const cat   = getCat(item.category);
  const year  = item.created_at ? new Date(item.created_at).getFullYear() : null;
  const isPrestasi = table === 'prestasi';

  const [loading, setLoading] = useState(true);

  return (
    <motion.div
      layout
      initial={{ opacity:0, y:28 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, scale:.95 }}
      transition={{ delay: i*.06, duration:.5, ease:[.22,1,.36,1] }}
      whileHover={{ y:-5 }}
      className="group relative bg-[#0D0D1A] rounded-[24px] overflow-hidden border border-white/[.05] flex flex-col h-full shadow-lg hover:border-white/[.12] transition-all duration-400"
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-30">
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 text-[8px] font-bold uppercase tracking-widest text-white shadow-lg"
          style={{ background: isPrestasi ? 'rgba(245,158,11,0.75)' : 'rgba(255,255,255,0.05)' }}>
          {cat.icon} {item.category || 'Lab'}
        </span>
      </div>

      {/* Image / Icon Section */}
      <div className="relative h-28 md:h-44 w-full overflow-hidden shrink-0 bg-[#0A0A16]">
        {loading && img && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#0A0A16]">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border-2 border-red-600/10 rounded-full" />
              <div className="absolute inset-0 border-2 border-t-red-600 rounded-full animate-spin shadow-[0_0_10px_rgba(220,38,38,0.2)]" />
            </div>
          </div>
        )}
        {img ? (
          <>
            <img src={img} alt={title} 
              onLoad={() => setLoading(false)}
              className={`w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out ${loading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D1A] via-[#0D0D1A]/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900/50 relative">
            <div className="absolute inset-0 opacity-10 bg-grid" />
            <cfg.Icon size={24} className="md:size-[32px]" style={{ color: cfg.color, opacity: 0.3 }} />
          </div>
        )}
        
        {year && (
          <div className="absolute bottom-3 right-3 z-20 px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm text-[8px] font-mono-lab text-zinc-500">
            {year}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 md:p-5 flex flex-col flex-1 relative">
        <div className="mb-3 flex-1">
          <h2 className="font-display font-bold text-[12px] md:text-lg text-white mb-1 leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
            {title}
          </h2>
          <p className="hidden md:block text-zinc-500 text-[12px] leading-relaxed line-clamp-2 italic">
            {desc}
          </p>
        </div>

        {/* Contributors & Action */}
        <div className="pt-3 border-t border-white/[.04] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[7px] font-mono-lab text-zinc-700 uppercase tracking-widest mb-1">Kontributor</span>
            <MemberAvatars names={names} />
          </div>
          
          {item.repo_link ? (
            <a href={item.repo_link} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center bg-white/[.03] border border-white/10 text-white hover:bg-red-600 hover:border-red-500 transition-all duration-300">
              <ExternalLink size={12} className="md:size-[14px]" />
            </a>
          ) : (
             <Trophy size={12} className="text-zinc-800 md:size-[14px]" />
          )}
        </div>

        {isPrestasi && (
          <div className="absolute top-0 right-6 w-px h-8 bg-gradient-to-b from-amber-500 to-transparent opacity-30" />
        )}
      </div>
    </motion.div>
  );
}

export default function DisplayList({ table, title }) {
  const [data,    setData]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [q,       setQ]      = useState('');
  const [cat,     setCat]    = useState('ALL');

  const cfg = CFG[table] || CFG.awards;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data: res, error } = await supabase.from(table).select('*').order('created_at', { ascending:false });
        if (error) throw error;
        // Only use MOCK if there's no data AND it's a specific table we want to mock for development
        if (!res?.length) {
          setData([]); // It's empty, but not an error
        } else {
          setData(res);
        }
      } catch (err) { 
        console.error("Fetch error:", err);
        setData(MOCK(table)); 
      }
      setLoading(false);
    };
    load();
    window.scrollTo(0, 0);
  }, [table]);

  const cats     = ['ALL', ...new Set(data.map(d => d.category).filter(Boolean))];
  const filtered = data.filter(d => {
    const t = (d.title || d.name || '').toLowerCase();
    const s = (d.description || '').toLowerCase();
    const m = (d.members || d.contributors || '').toLowerCase();
    return (t.includes(q.toLowerCase()) || s.includes(q.toLowerCase()) || m.includes(q.toLowerCase()))
      && (cat === 'ALL' || d.category === cat);
  });

  if (loading) return (
    <div className="min-h-screen bg-[#06060E] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full border-2 animate-spin" style={{ borderColor:`${cfg.color}22`, borderTopColor:cfg.color }} />
        <p className="text-[11px] font-mono-lab uppercase tracking-widest animate-pulse" style={{ color:cfg.color }}>Memuat {title}...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#06060E] text-[#E8E8F2]">
      <div className="scanline" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[200px] rounded-full opacity-60" style={{ background:`${cfg.heroGlow}18` }} />
        <div className="absolute inset-0 bg-grid opacity-35" />
      </div>

      {/* HERO */}
      <section className="relative pt-28 pb-16 overflow-hidden border-b border-white/[.04]">
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10">
          <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }}>
            <span className="text-[10px] font-mono-lab tracking-[0.25em] uppercase mb-4 block" style={{ color:cfg.color }}>
              Foresty Lab · {cfg.label}
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 mt-1"
                  style={{ background:cfg.glow, border:`1px solid ${cfg.border}`, boxShadow:`0 0 40px ${cfg.color}22` }}>
                  <cfg.Icon size={28} style={{ color:cfg.color }} />
                </div>
                <div>
                  <h1 className="font-display font-extrabold text-4xl md:text-7xl text-white tracking-tight leading-[.92] mb-3">{title}</h1>
                  <p className="text-zinc-600 text-sm max-w-md leading-relaxed">{cfg.desc}</p>
                </div>
              </div>
              <div className="text-center md:text-right shrink-0">
                <div className="font-display font-extrabold text-5xl text-white">{filtered.length}</div>
                <div className="text-[10px] font-mono-lab text-zinc-700 uppercase tracking-widest mt-1">Records</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STICKY FILTER */}
      <div className="sticky top-[72px] z-30 bg-[#06060E]/97 backdrop-blur-[28px] border-b border-white/[.04]">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-3 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1">
            {cats.map(c => {
              const active = cat === c;
              const cc = getCat(c);
              const count = c === 'ALL' ? data.length : data.filter(d=>d.category===c).length;
              return (
                <button key={c} onClick={() => setCat(c)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${active ? 'text-white border' : 'text-zinc-600 hover:text-white border border-transparent'}`}
                  style={active ? { background:cc.bg, borderColor:cc.border, color:cc.text } : {}}>
                  {cc.icon} {c === 'ALL' ? 'Semua' : c}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${active ? '' : 'bg-white/[.04] text-zinc-600'}`}
                    style={active ? { background:cc.bg, color:cc.text } : {}}>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="relative shrink-0">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
            <input type="text" placeholder={`Cari ${title.toLowerCase()}...`} value={q} onChange={e=>setQ(e.target.value)}
              className="w-48 bg-white/[.03] border border-white/[.07] focus:border-white/[.15] text-white text-[12px] rounded-lg pl-8 pr-3 py-2 outline-none transition-all placeholder:text-zinc-700 font-mono-lab" />
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 py-12">
        <motion.div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => <DataCard key={item.id} item={item} cfg={cfg} i={i} table={table} />)}
          </AnimatePresence>
        </motion.div>

        {!filtered.length && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
            className="py-36 flex flex-col items-center text-center border border-dashed border-white/[.04] rounded-2xl mt-4">
            <div className="w-16 h-16 rounded-full border border-white/[.06] flex items-center justify-center mb-4">
              <ShieldAlert size={24} className="text-zinc-700" />
            </div>
            <h3 className="font-display font-bold text-lg text-zinc-600 mb-2">Tidak Ada Data</h3>
            <p className="text-zinc-700 text-sm mb-6">Coba ubah kata kunci pencarian atau reset filter.</p>
            <button onClick={() => { setQ(''); setCat('ALL'); }} className="btn-ghost text-xs py-2 px-5">Reset Filter</button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
