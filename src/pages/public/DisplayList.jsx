import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, Award, Briefcase, ExternalLink, Terminal, ShieldAlert } from 'lucide-react';

const getDirectDriveLink = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
        const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/) || 
                       url.match(/id=([a-zA-Z0-9_-]{25,})/) ||
                       url.match(/\/file\/d\/([a-zA-Z0-9_-]{25,})/);
        if (idMatch && idMatch[1]) {
            return `https://lh3.googleusercontent.com/d/${idMatch[1]}=s1000`;
        }
    }
    return url;
};

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const DisplayList = ({ table, title }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: result, error } = await supabase
                    .from(table)
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error || !result || result.length === 0) {
                    throw new Error("No data or error");
                } else {
                    setData(result);
                }
            } catch (err) {
                // FALLBACK MOCK DATA FOR DEMO PURPOSES
                console.log("Using mock data for demo purposes");
                const mockData = [
                    {
                        id: "sys_mock_a1b2c3",
                        title: table === 'prestasi' ? "Juara 1 Cyber Defense Competition" : "Advanced Cryptography Implementation",
                        description: table === 'prestasi' ? "Tim Foresty berhasil menempati peringkat pertama dalam kompetisi keamanan siber tingkat internasional." : "Penetrasi sistem dan simulasi pengamanan enkripsi tingkat tinggi pada infrastruktur grid.",
                        members: "Agent K, Agent J, Override",
                        category: table === 'prestasi' ? "COMPETITION" : "RESEARCH",
                        created_at: new Date().toISOString(),
                        photo_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
                        repo_link: "#"
                    },
                    {
                        id: "sys_mock_x9y8z7",
                        title: table === 'prestasi' ? "Medali Emas Hackathon 2026" : "Zero-Day Vulnerability Scanning System",
                        description: table === 'prestasi' ? "Menciptakan solusi deteksi anomali pada network traffic secara real-time." : "Pengembangan algoritma machine learning untuk mendeteksi ancaman siber (zero-day exploit) lebih cepat.",
                        members: "Cipher, Null, Void",
                        category: table === 'prestasi' ? "HACKATHON" : "A.I SECURITY",
                        created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
                        photo_url: "https://images.unsplash.com/photo-1618060932014-4bcd4f31c51a?q=80&w=1000&auto=format&fit=crop",
                        repo_link: "#"
                    },
                    {
                        id: "sys_mock_q1w2e3",
                        title: table === 'prestasi' ? "Penghargaan Lab Terbaik" : "Blockchain Forensics Automation",
                        description: table === 'prestasi' ? "Dinobatkan sebagai laboratorium dengan kontribusi riset terbanyak di bidang keamanan siber." : "Metode otomasi dalam melacak transaksi anonim pada jaringan blockchain (crypto-tracking).",
                        category: "HONOR",
                        created_at: new Date(Date.now() - 86400000 * 90).toISOString(),
                        photo_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
                    }
                ];
                setData(mockData);
            }
            setLoading(false);
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [table]);

    const filteredData = data.filter(item => {
        const titleText = item.title || item.title_achievement || item.name || '';
        const descText = item.description || item.competition_name || item.institution || '';
        return titleText.toLowerCase().includes(searchTerm.toLowerCase()) || 
               descText.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) return (
        <div className="min-h-screen bg-[#110000] flex flex-col items-center justify-center p-6 pt-24 selection:bg-primary selection:text-white relative overflow-hidden">
            <div className="scanline-bar"></div>
            <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-2 border-primary-dark/20 border-t-primary rounded-full mb-6 shadow-[0_0_15px_rgba(237,27,36,0.5)]"
            />
            <div className="flex flex-col items-center gap-3">
                <p className="text-sm font-mono text-primary animate-pulse tracking-[0.3em] uppercase">Initializing Secure Link...</p>
                <div className="h-1 w-48 bg-[#1a0000] rounded overflow-hidden">
                    <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-full bg-primary"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#110000] text-gray-200 font-sans selection:bg-primary selection:text-white relative pb-24 overflow-x-hidden">
            {/* Global scanline and grid */}
            <div className="scanline-bar pointer-events-none"></div>
            <div className="absolute inset-0 bg-grid-red pointer-events-none opacity-20"></div>

            <div className="relative max-w-6xl mx-auto px-6 pt-32 z-10">
                {/* Header Container */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-6 mb-6">
                        <div className="p-4 bg-gradient-to-br from-[#800508] to-primary/80 rounded-xl shadow-[0_0_25px_rgba(237,27,36,0.4)] border border-red-500/30">
                            {table === 'prestasi' ? <Award className="w-8 h-8 text-white" /> : 
                             table === 'projects' ? <Briefcase className="w-8 h-8 text-white" /> :
                             <Database className="w-8 h-8 text-white" />}
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-white font-cyber drop-shadow-lg">
                                    <span className="text-primary opacity-80">SYS_</span>DATA_{table.toUpperCase()}
                                </h1>
                            </div>
                            <p className="text-xs font-mono text-primary/70 tracking-widest uppercase mt-2">
                                [ ACTIVE_MODULE: {title} ]
                            </p>
                        </div>
                    </div>

                    {/* Search / Filter Bar */}
                    <div className="relative mt-10 group max-w-2xl">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-primary/50 group-focus-within:text-primary transition-colors">
                            <Search className="w-5 h-5" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Query records, entities, or anomalies..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#0a0000] border border-primary-dark/30 text-white text-sm hover:border-primary/50 focus:ring-1 focus:ring-primary focus:border-primary block pl-12 p-4 transition-all duration-400 shadow-[inset_0_0_25px_rgba(0,0,0,0.6)] font-mono placeholder:text-gray-700 rounded-lg outline-none"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                            <div className="px-3 py-1 bg-primary/10 text-[10px] font-mono text-primary/80 border border-primary/20 rounded shadow-[0_0_10px_rgba(237,27,36,0.1)]">
                                {filteredData.length} records
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Grid Container */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredData.map((item) => {
                            const cardTitle = item.title || item.title_achievement || item.name;
                            const cardSub = item.description || item.competition_name || item.institution;
                            // Safe fallback for id visualization
                            const identifier = item.id ? String(item.id).substring(0, 8) : 'UNK_ID';
                            
                            return (
                                <motion.div 
                                    key={item.id || Math.random()} 
                                    variants={itemVariants}
                                    layout
                                    className="bg-[#0a0000] border border-primary-dark/20 rounded-xl group hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col relative hover:shadow-[0_8px_30px_rgba(237,27,36,0.2)] hover:-translate-y-1.5"
                                >
                                    {/* Cyber UI Overlays */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    <div className="absolute right-0 top-1/2 w-[2px] h-16 bg-primary/40 group-hover:bg-primary transition-colors shadow-[0_0_15px_rgba(237,27,36,1)] translate-y-[-50%]"></div>

                                    {/* Status Bar */}
                                    <div className="flex justify-between items-center bg-[#150000] px-5 py-3 border-b border-primary-dark/20">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></div>
                                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest leading-none mt-0.5">DB // {identifier}</span>
                                        </div>
                                        {item.created_at && (
                                            <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                                                {new Date(item.created_at).getFullYear()}
                                            </span>
                                        )}
                                    </div>

                                    {/* Image Section for Prestasi */}
                                    {table === 'prestasi' && item.photo_url && (
                                        <div className="w-full h-52 bg-[#050000] border-b border-primary-dark/30 relative overflow-hidden group-hover:border-primary/50 transition-colors">
                                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                            {/* Digital grid overlay on image */}
                                            <div className="absolute inset-0 bg-grid-red/30 z-10 opacity-30 mix-blend-screen pointer-events-none"></div>
                                            <img 
                                                src={getDirectDriveLink(item.photo_url)} 
                                                alt={cardTitle} 
                                                className="w-full h-full object-cover grayscale-[40%] contrast-[1.1] filter group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                            />
                                        </div>
                                    )}

                                    {/* Body */}
                                    <div className="p-6 flex-grow flex flex-col z-20">
                                        <div className="flex-grow">
                                            <h2 className="font-bold text-xl mb-3 text-white group-hover:text-primary transition-colors duration-300 font-cyber flex items-start gap-2 leading-tight">
                                                <span className="text-primary text-base opacity-70 font-mono mt-0.5">&gt;</span>
                                                {cardTitle}
                                            </h2>
                                            <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-4">
                                                {cardSub}
                                            </p>
                                        </div>
                                        
                                        {(item.members || item.contributors) && (
                                            <div className="mb-5 bg-[#050000] border border-primary-dark/30 p-4 rounded-lg flex items-start gap-3 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
                                                <Terminal className="w-4 h-4 text-primary mt-0.5 shrink-0 opacity-80" />
                                                <div>
                                                    <p className="text-[10px] font-mono text-primary/70 uppercase tracking-widest mb-1.5">Assigned Agents:</p>
                                                    <p className="text-xs text-gray-300 font-sans leading-relaxed">{item.members || item.contributors}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Footer tags */}
                                        <div className="pt-5 border-t border-primary-dark/20 flex flex-wrap gap-3 items-center justify-between">
                                            <div className="flex gap-2">
                                                {item.category && (
                                                    <span className="bg-[#150000] border border-primary-dark/40 text-gray-300 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest rounded group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                                                        {item.category}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {item.repo_link && (
                                                <a 
                                                    href={item.repo_link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="flex items-center gap-1.5 text-[11px] text-primary hover:text-white font-mono uppercase tracking-widest transition-colors z-20"
                                                >
                                                    EXPLORE <ExternalLink className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredData.length === 0 && !loading && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-32 flex flex-col items-center justify-center text-center border-2 border-dashed border-primary-dark/30 rounded-2xl bg-[#0a0000]/60 relative overflow-hidden"
                    >
                        {/* Empty state glow */}
                        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                        
                        <ShieldAlert className="w-20 h-20 text-primary-dark/40 mb-6 drop-shadow-[0_0_15px_rgba(237,27,36,0.2)]" />
                        <h3 className="text-2xl font-cyber text-primary mb-3 uppercase tracking-widest drop-shadow-md">ERR: NO_RECORDS_FOUND</h3>
                        <p className="text-gray-400 font-mono text-sm max-w-md leading-relaxed">
                            Search parameters yielded zero results in the <span className="text-white">{table}</span> database cluster. Please adjust your query or reset the filter.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default DisplayList;
