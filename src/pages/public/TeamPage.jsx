import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, GraduationCap, BookOpen, Terminal, Shield, Cpu, Camera, Users, ChevronRight } from 'lucide-react';

/* ── SVG Brand Icons ─────────────────────────────────────── */
const GithubIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.5 6.5-7a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5.4 3.3 6.6 6.5 7a4.8 4.8 0 0 0-1 3.02v4"/>
        <path d="M9 18c-4.5 1.5-5-2-7-2"/>
    </svg>
);

const InstagramIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
    </svg>
);

/* ── Utility ─────────────────────────────────────────────── */
const getDirectDriveLink = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
        const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/) ||
            url.match(/id=([a-zA-Z0-9_-]{25,})/) ||
            url.match(/\/file\/d\/([a-zA-Z0-9_-]{25,})/);
        if (idMatch && idMatch[1]) return `https://lh3.googleusercontent.com/d/${idMatch[1]}=s1000`;
    }
    return url;
};

/* ── Data ────────────────────────────────────────────────── */
const teamMembers = [
    {
        id: '1', name: 'Assoc. Prof. Dr. VERA SURYANI, S.T., M.T.',
        position: 'Dosen Pembina', major: 'Informatika', batch: 'Dosen',
        skills: 'Computer network, internet of thing',
        role: 'advisor', dept: 'advisor', photo_url: '',
        scholar_url: 'https://scholar.google.com/citations?hl=id&user=fphVMf8AAAAJ',
        sinta_url: 'https://sinta.kemdiktisaintek.go.id/authors/profile/28717',
    },
    {
        id: '2', name: 'Ir. AULIA ARIF WARDANA, S.Kom., M.T.',
        position: 'Dosen Pembina', major: 'Informatika', batch: 'Dosen',
        skills: 'Network Security, Intrusion Detection, Distributed Ledger',
        role: 'advisor', dept: 'advisor', photo_url: '',
        scholar_url: 'https://scholar.google.com/citations?user=VeQwJAsAAAAJ&hl=en',
        sinta_url: 'https://sinta.kemdiktisaintek.go.id/authors/profile/6722822',
    },
    {
        id: '3', name: 'Gian Maxmillian Firdaus, S.Kom., M.Kom.',
        position: 'Dosen Pembina', major: 'Informatika', batch: 'Dosen',
        skills: 'Machine learning, cybersecurity',
        role: 'advisor', dept: 'advisor', photo_url: '',
        scholar_url: 'https://scholar.google.com/citations?user=lMde22kAAAAJ&hl=en',
        sinta_url: 'https://sinta.kemdiktisaintek.go.id/authors/profile/6979746',
    },
    {
        id: '4', name: 'Faisal Ihsan Santoso',
        position: 'Ketua Laboratory', major: 'S1 Teknologi Informasi', batch: '2023',
        skills: 'CTF, Bug Hunter',
        role: 'executive', dept: 'executive', photo_url: '',
        linkedin_url: 'https://id.linkedin.com/in/faisalsan',
        github_url: 'https://github.com/CyrusSE',
        ig_url: 'https://www.instagram.com/callmecal.ok',
    },
    {
        id: '5', name: 'Gilang Wasis Wicaksono',
        position: 'Wakil Laboratory', major: 'S1 Teknologi Informasi', batch: '2023',
        skills: 'Cyber Security Forensic, OSINT, IT Audit, SoC analyst, AI, Machine Learning, Fullstack Software Development, Computer Vision, IoT',
        role: 'executive', dept: 'executive', photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/gilang-wasis-wicaksono2/',
        github_url: 'https://github.com/langss1',
    },
    {
        id: '12', name: 'Danish Felicitia',
        position: 'Bendahara', major: 'S1 Informatika', batch: '2023',
        skills: 'OSINT, Cryptography',
        role: 'executive', dept: 'executive', photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/danish-felicitia',
        github_url: 'https://github.com/fairycookies',
        ig_url: 'https://www.instagram.com/moonvaleo',
    },
    {
        id: '6', name: 'Ramadhan Tangguh Defender',
        position: 'Koordinator Akademik', major: 'S1 Teknologi Informasi', batch: '2024',
        skills: 'Cybersecurity',
        role: 'coordinator', dept: 'akademik', photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/defen',
    },
    {
        id: '7', name: 'Muhammad Rafli Ardiansyah',
        position: 'Anggota Akademik', major: 'S1 Informatika', batch: '2023',
        skills: 'Cybersecurity',
        role: 'member', dept: 'akademik', photo_url: '',
    },
    {
        id: '8', name: 'Fityah Bayodiansyah Harahap',
        position: 'Anggota Akademik', major: 'S1 Rekayasa Perangkat Lunak', batch: '2024',
        skills: 'Infrastructure management',
        role: 'member', dept: 'akademik', photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/fityah-bayodiansyah-harahap-578a35279',
        github_url: 'https://github.com/BbayuGt',
    },
    {
        id: '9', name: 'Abdul Jabbar Hawali Al Dzahabi',
        position: 'Koordinator Media', major: 'S1 Teknologi Informasi', batch: '2024',
        skills: 'Desain Grafis, UI/UX, Cybersecurity',
        role: 'coordinator', dept: 'media', photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/abduljabbarhawalialdzahabi',
        github_url: 'https://github.com/Xyzet29',
        ig_url: 'https://www.instagram.com/abdoeeell_/',
    },
    {
        id: '10', name: 'Frizanka Aryaguna',
        position: 'Anggota Media', major: 'S1 Teknologi Informasi', batch: '2023',
        skills: 'Forensics, Cryptography',
        role: 'member', dept: 'media', photo_url: '',
        linkedin_url: 'https://id.linkedin.com/in/frizanka-aryaguna-179494292',
        github_url: 'https://github.com/Zunnkuu',
        ig_url: 'https://www.instagram.com/zankaarya._/',
    },
    {
        id: '11', name: 'Fazli Rabbi',
        position: 'Anggota Media', major: 'S1 Teknologi Informasi', batch: '2024',
        skills: 'Desain Grafis, Video Editing, Web Development, Game Development',
        role: 'member', dept: 'media', photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/fazli-rabbi-11b113329/',
        github_url: 'https://github.com/lately-dev',
        ig_url: 'https://www.instagram.com/fazli.r2/',
    },
    {
        id: '13', name: 'Zaidan Kamil Munadi',
        position: 'Anggota Human Resource', major: 'S1 Teknologi Informasi', batch: '2024',
        skills: 'Critical thinking, Cyber Security, Web development',
        role: 'member', dept: 'hr', photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/zaidan-kamil-munadi',
        github_url: 'https://github.com/Danzz2706',
        ig_url: 'https://instagram.com/zaidanmunadi_',
    }
];

/* ── Per-dept config ────────────────────────────────────── */
const DEPT_CONFIG = {
    advisor:  { label: 'Research Advisors',      icon: GraduationCap, color: 'from-amber-500/20   to-amber-500/5',    border: 'border-amber-500/30',   badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',     dot: 'bg-amber-400',   code: '⬡'  },
    executive:{ label: 'Executive Board',         icon: Shield,         color: 'from-red-600/40    to-red-500/10',     border: 'border-red-500/60',     badge: 'bg-red-600/20  text-red-400  border-red-500/40',         dot: 'bg-red-500',     code: '◈'  },
    akademik: { label: 'Akademik & Research',     icon: Cpu,            color: 'from-blue-500/20   to-blue-500/5',    border: 'border-blue-500/30',    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',        dot: 'bg-blue-400',   code: '⌬'  },
    media:    { label: 'Media & Creative',        icon: Camera,         color: 'from-purple-500/20 to-purple-500/5',  border: 'border-purple-500/30',  badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',  dot: 'bg-purple-400', code: '✦'  },
    hr:       { label: 'Human Resource',          icon: Users,          color: 'from-emerald-500/20 to-emerald-500/5',border: 'border-emerald-500/30', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',dot: 'bg-emerald-400', code: '⊕'  },
};

/* ── Member Card ────────────────────────────────────────── */
const MemberCard = ({ member, idx, cfg }) => {
    const DotColor = cfg.dot;
    const [skillsExpanded, setSkillsExpanded] = useState(false);
    const allSkills = member.skills ? member.skills.split(',').map(s => s.trim()) : [];
    const visibleSkills = skillsExpanded ? allSkills : allSkills.slice(0, 3);
    const hiddenCount = allSkills.length - 3;
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: idx * 0.06, duration: 0.5 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group relative h-full"
        >
            {/* Glow outline on hover */}
            <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${cfg.color} blur-sm`} />

            <div className={`relative h-full bg-[#161618] border border-white/[0.10] group-hover:${cfg.border} rounded-2xl transition-all duration-300 flex flex-col overflow-hidden`}>
                {/* Top colour bar */}
                <div className={`h-0.5 w-full bg-gradient-to-r ${cfg.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="p-5 flex flex-col h-full">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className={`w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-zinc-800 group-hover:${cfg.border} transition-colors duration-300`}>
                                {member.photo_url ? (
                                    <img
                                        src={getDirectDriveLink(member.photo_url)}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                        <User size={24} />
                                    </div>
                                )}
                            </div>
                            {/* Active dot */}
                            <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ${DotColor} border-2 border-[#0c0c0e] shadow-lg`} />
                        </div>

                        {/* Batch & dept badge */}
                        <div className="flex flex-col items-end gap-1.5 min-w-0">
                            <span className="font-mono text-[10px] text-zinc-500">{member.batch || '—'}</span>
                            <span className={`px-2 py-0.5 rounded-md border text-[9px] font-mono uppercase tracking-wide ${cfg.badge} whitespace-nowrap`}>
                                {cfg.code}
                            </span>
                        </div>
                    </div>

                    {/* Name & position */}
                    <div className="mb-4">
                        <h3 className="font-bold text-zinc-100 text-sm leading-snug mb-1 group-hover:text-white transition-colors line-clamp-2">
                            {member.name}
                        </h3>
                        <p className="text-[11px] text-zinc-400 font-medium">{member.position}</p>
                    </div>

                    {/* Major */}
                    <p className="text-[10px] text-zinc-500 mb-4 font-mono truncate">{member.major}</p>

                    {/* Skills */}
                    {member.skills && (
                        <div className="mb-5">
                            <div className="flex flex-wrap gap-1">
                                {visibleSkills.map((s, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.04 }}
                                        className="px-2 py-0.5 bg-white/[0.06] border border-white/[0.10] text-[9px] text-zinc-400 rounded-md font-mono"
                                    >
                                        {s}
                                    </motion.span>
                                ))}
                                {!skillsExpanded && hiddenCount > 0 && (
                                    <button
                                        onClick={() => setSkillsExpanded(true)}
                                        className={`px-2 py-0.5 rounded-md border text-[9px] font-mono cursor-pointer transition-all duration-200 ${cfg.badge} hover:opacity-100 opacity-80`}
                                    >
                                        +{hiddenCount} more
                                    </button>
                                )}
                            </div>
                            {skillsExpanded && hiddenCount > 0 && (
                                <button
                                    onClick={() => setSkillsExpanded(false)}
                                    className="mt-2 text-[9px] font-mono text-zinc-600 hover:text-zinc-400 transition-colors"
                                >
                                    ↑ show less
                                </button>
                            )}
                        </div>
                    )}

                    {/* Social links */}
                    <div className="mt-auto pt-4 border-t border-white/[0.05] flex gap-3 items-center">
                        {member.linkedin_url && (
                            <a href={member.linkedin_url} target="_blank" rel="noreferrer" title="LinkedIn"
                               className="text-zinc-600 hover:text-white transition-colors duration-200">
                                <LinkedinIcon size={15} />
                            </a>
                        )}
                        {member.github_url && (
                            <a href={member.github_url} target="_blank" rel="noreferrer" title="GitHub"
                               className="text-zinc-600 hover:text-white transition-colors duration-200">
                                <GithubIcon size={15} />
                            </a>
                        )}
                        {member.ig_url && (
                            <a href={member.ig_url} target="_blank" rel="noreferrer" title="Instagram"
                               className="text-zinc-600 hover:text-white transition-colors duration-200">
                                <InstagramIcon size={15} />
                            </a>
                        )}
                        {member.scholar_url && (
                            <a href={member.scholar_url} target="_blank" rel="noreferrer" title="Google Scholar"
                               className="text-zinc-600 hover:text-amber-400 transition-colors duration-200 flex items-center gap-1">
                                <GraduationCap size={15} />
                                <span className="text-[9px] font-mono hidden group-hover:inline">Scholar</span>
                            </a>
                        )}
                        {member.sinta_url && (
                            <a href={member.sinta_url} target="_blank" rel="noreferrer" title="SINTA"
                               className="text-zinc-600 hover:text-amber-400 transition-colors duration-200 flex items-center gap-1">
                                <BookOpen size={15} />
                                <span className="text-[9px] font-mono hidden group-hover:inline">SINTA</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ── Section Banner ─────────────────────────────────────── */
const SectionBanner = ({ cfg, count, catIdx }) => {
    const Icon = cfg.icon;
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
        >
            {/* Top line + code label */}
            <div className="flex items-center gap-3 mb-4">
                <div className={`h-px flex-1 bg-gradient-to-r ${cfg.color}`} />
                <span className="font-mono text-[10px] text-zinc-600 tracking-[0.25em] uppercase">{cfg.code}</span>
                <div className="h-px w-8 bg-white/10" />
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    {/* Icon box */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cfg.color} border ${cfg.border} flex items-center justify-center`}>
                        <Icon size={22} className="text-white/80" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-white font-cyber uppercase tracking-tighter leading-none">
                            {cfg.label}
                        </h2>
                        <p className="text-xs text-zinc-600 mt-0.5 font-mono">{count} member{count !== 1 ? 's' : ''} in this department</p>
                    </div>
                </div>

                {/* Index badge */}
                <div className="text-6xl font-black font-cyber text-white/[0.04] select-none leading-none">
                    {String(catIdx + 1).padStart(2, '0')}
                </div>
            </div>
        </motion.div>
    );
};

/* ── Page ────────────────────────────────────────────────── */
const TeamPage = () => {
    const [activeTab, setActiveTab] = useState('all');

    const allCategories = [
        { id: 'advisor',  data: teamMembers.filter(m => m.dept === 'advisor') },
        { id: 'executive',data: teamMembers.filter(m => m.dept === 'executive') },
        { id: 'akademik', data: teamMembers.filter(m => m.dept === 'akademik') },
        { id: 'media',    data: teamMembers.filter(m => m.dept === 'media') },
        { id: 'hr',       data: teamMembers.filter(m => m.dept === 'hr') },
    ].filter(c => c.data.length > 0);

    const tabs = [
        { id: 'all', label: 'All Teams' },
        ...allCategories.map(c => ({ id: c.id, label: DEPT_CONFIG[c.id].label })),
    ];

    const visibleCategories = activeTab === 'all'
        ? allCategories
        : allCategories.filter(c => c.id === activeTab);

    return (
        <div className="min-h-screen bg-[#060608] pt-28 pb-32 text-zinc-300 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[160px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[160px] rounded-full" />
                {/* Grid dots */}
                <div className="absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                {/* ── Hero ── */}
                <motion.header
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 max-w-3xl mx-auto relative"
                >
                    {/* Red glow blobs — behind everything */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/15 blur-[160px] rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-primary-dark/30 blur-[100px] rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-red-600/25 blur-[60px] rounded-full" />
                        <div className="absolute top-1/3 left-1/3 w-[180px] h-[180px] bg-primary/20 blur-[80px] rounded-full" />
                        <div className="absolute top-1/3 right-1/4 w-[180px] h-[180px] bg-primary-dark/20 blur-[80px] rounded-full" />
                    </div>

                    {/* Content — always on top */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-mono tracking-[0.25em] text-primary uppercase">Struktural Organization · Foresty Lab</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black font-cyber uppercase tracking-tighter leading-none mb-6">
                            <span className="text-white">Our </span><span className="text-primary">Team</span>
                        </h1>
                        <p className="text-zinc-400 leading-relaxed max-w-xl mx-auto text-sm">
                            A multidisciplinary group of researchers, engineers, and creatives united by Cybersecurity, Digital Forensics, and Incident Response.
                        </p>

                        {/* Stats row */}
                        <div className="flex justify-center gap-10 mt-10">
                            {[
                                { v: teamMembers.filter(m => m.dept === 'advisor').length, l: 'Advisors' },
                                { v: teamMembers.length, l: 'Members' },
                                { v: allCategories.length, l: 'Departments' },
                            ].map(({ v, l }) => (
                                <div key={l} className="text-center">
                                    <div className="text-2xl font-black font-cyber text-white">{v}</div>
                                    <div className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest mt-0.5">{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.header>

                {/* ── Tabs ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-wrap gap-2 justify-center mb-16"
                >
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wide border transition-all duration-200
                                ${activeTab === tab.id
                                    ? 'bg-primary border-primary text-white shadow-[0_0_20px_rgba(237,27,36,0.3)]'
                                    : 'bg-white/[0.03] border-white/[0.08] text-zinc-500 hover:border-white/20 hover:text-zinc-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </motion.div>

                {/* ── Dept Sections ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-24"
                    >
                        {visibleCategories.map((cat, catIdx) => {
                            const cfg = DEPT_CONFIG[cat.id];
                            return (
                                <section key={cat.id} id={cat.id}>
                                    <SectionBanner cfg={cfg} count={cat.data.length} catIdx={catIdx} />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                        {cat.data.map((member, idx) => (
                                            <MemberCard key={member.id} member={member} idx={idx} cfg={cfg} />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* ── Footer strip ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-12 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <div className="flex items-center gap-3">
                        <Terminal size={18} className="text-primary-dark" />
                        <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-widest">Foresty Lab · Structural Data · 2026</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-700 font-mono text-[10px]">
                        <span className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
                        All systems operational
                    </div>
                </motion.div>
            </div>

            {/* Scanline overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-[0.025]">
                <div className="w-full h-0.5 bg-white animate-scanline" />
            </div>
        </div>
    );
};

export default TeamPage;
