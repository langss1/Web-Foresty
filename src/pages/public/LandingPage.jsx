import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Database, GraduationCap, Award, Shield, Key, Search, Terminal, Crosshair, Cpu, ChevronRight } from 'lucide-react';

const LandingPage = () => {
    const [typedText, setTypedText] = useState("");
    const fullText = "Initializing secure connection... [OK]\nLoading core modules... [OK]\nAccess granted.";

    useEffect(() => {
        let i = 0;
        if (i < fullText.length) {
            const typingInterval = setInterval(() => {
                setTypedText(fullText.substring(0, i + 1));
                i++;
                if (i === fullText.length) {
                    clearInterval(typingInterval);
                }
            }, 50);
            return () => clearInterval(typingInterval);
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-primary-dark overscroll-none relative">
            {/* Global Overlay Effects */}
            <div className="fixed inset-0 pointer-events-none bg-grid opacity-30 z-0"></div>
            <div className="fixed inset-0 pointer-events-none bg-cyber-dots opacity-20 z-0 animate-pulse-soft"></div>
            <div className="fixed top-0 left-0 w-full h-[2px] bg-primary/30 shadow-[0_0_10px_#ed1b24] pointer-events-none z-50 animate-scanline opacity-40"></div>

            {/* Header/Hero Section */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-2 gap-12 items-center">
                {/* Red Orbs */}
                <div className="absolute top-10 left-0 w-[500px] h-[500px] bg-primary-dark/20 blur-[150px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
                
                <div className="relative space-y-6">
                    <div className="flex items-center space-x-3 text-primary font-mono text-sm tracking-widest uppercase mb-4">
                        <Terminal className="w-5 h-5 animate-pulse" />
                        <span>System.Identity: Lab_Riset</span>
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-black leading-none font-cyber text-white tracking-widest relative group">
                        <span className="group-hover:animate-glitch inline-block">FORESTY</span><br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">LAB.</span>
                    </h1>
                    
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent my-6"></div>

                    <p className="text-gray-400 max-w-lg mt-4 text-lg leading-relaxed border-l-2 border-primary-dark/50 pl-4 font-mono">
                        Cybersecurity and Digital Forensic Lab di bawah naungan Kelompok Keahlian CITI (Cyber Infrastructure and Trusted Intelligence).
                    </p>
                    
                    <div className="pt-10 flex gap-4">
                        <Link to="/team" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-[#0A0A0A] border border-primary-dark hover:border-primary overflow-hidden transition-all duration-300 shadow-[0_0_15px_rgba(178,41,48,0.3)] hover:shadow-red-glow">
                            <div className="absolute inset-0 w-0 bg-gradient-to-r from-primary-dark to-primary transition-all duration-[250ms] ease-out group-hover:w-full opacity-20"></div>
                            <span className="relative z-10 flex items-center font-cyber tracking-wider">
                                INIT_CONNECTION() <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </div>
                </div>
                
                {/* Right Terminal Visual */}
                <div className="relative hidden lg:block z-10 perspective-1000">
                    <div className="relative transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-primary-dark via-[#111] to-primary/20 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                        <div className="glass rounded-xl overflow-hidden shadow-2xl border border-primary/20">
                            {/* Window Header */}
                            <div className="bg-[#111] px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <span className="text-xs font-mono text-zinc-500">root@foresty:~</span>
                            </div>
                            {/* Window Content */}
                            <div className="p-6 font-mono text-sm text-green-500 min-h-[300px] flex flex-col justify-end relative">
                                <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-primary-dark/10" />
                                <div className="z-10 whitespace-pre-line leading-loose">
                                    <span className="text-blue-400">root@foresty</span>:<span className="text-zinc-300">~</span>$ ./run_diagnostics.sh
                                    <br />
                                    {typedText}
                                    <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Operations (Numbered Cards) */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-primary-dark/20">
                <div className="flex items-center space-x-4 mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-cyber text-white tracking-wide">
                        <span className="text-primary">&gt;</span> CORE_OPERATIONS
                    </h2>
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-primary-dark/50 to-transparent"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                    {[
                        { id: "01", title: "Riset Keamanan", desc: "Penelitian mendalam tren keamanan siber terbaru dan metode analisis forensik digital pada platform terkini." },
                        { id: "02", title: "Talent Incubator", desc: "Mentoring & study group mahasiswa untuk mempersiapkan kompetisi Capture The Flag (CTF) elit." },
                        { id: "03", title: "Penetrasi Aktif", desc: "Pengujian penetrasi ekstensif dan audit keamanan infrastruktur jaringan bagi sektor publik & privat." }
                    ].map((item, i) => (
                        <div key={i} className="group relative bg-[#0c0c0c] border border-zinc-800 p-8 rounded-sm transition-all duration-300 hover:border-primary/50 hover:bg-[#111111]">
                            {/* Brackets Effect */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-transparent group-hover:border-primary transition-colors"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-primary transition-colors"></div>
                            
                            <div className="flex justify-between items-start mb-6">
                                <div className="text-5xl font-cyber font-black text-[#1a1a1a] group-hover:text-primary-dark/40 transition-colors pointer-events-none">
                                    {item.id}
                                </div>
                                <Cpu className="w-8 h-8 text-zinc-600 group-hover:text-primary transition-colors" />
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-4 text-white font-cyber tracking-wide group-hover:text-glow">{item.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed font-mono">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Threat & Objective Matrix (Icons Grid) */}
            <section className="relative z-10 bg-[#080808] border-y border-primary-dark/20">
                 {/* Internal glow */}
                <div className="absolute inset-0 bg-primary-dark/5 opacity-50 blur-[100px]"></div>
                
                <div className="max-w-7xl mx-auto px-6 py-24 relative">
                    <div className="text-center mb-20">
                        <p className="text-primary font-mono text-sm tracking-[0.3em] mb-2">[ STRATEGIC_OBJECTIVES ]</p>
                        <h2 className="text-3xl md:text-5xl font-black font-cyber text-white uppercase text-glow-dark">Fokus Infrastruktur</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
                        {[
                            { icon: Terminal, title: "Tools Forensik", desc: "Pengembangan Tools Digital Forensics Toolkit" },
                            { icon: Shield, title: "Network Def", desc: "Penguatan & Analisis Serangan Jaringan" },
                            { icon: Search, title: "Malware Lab", desc: "Reverse Engineering & Isolasi Insiden" },
                            { icon: Crosshair, title: "CTF Architect", desc: "Perancangan Skenario Serangan Siber" }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center group cursor-crosshair">
                                <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                                    {/* Radar rings */}
                                    <div className="absolute inset-0 border border-primary-dark/30 rounded-full animate-ping opacity-20 group-hover:border-primary group-hover:opacity-100 transition-colors"></div>
                                    <div className="absolute inset-2 border border-zinc-700/50 rounded-full group-hover:rotate-90 transition-transform duration-700"></div>
                                    <div className="absolute inset-4 bg-[#111] rounded-full border border-primary/20 group-hover:shadow-[0_0_20px_rgba(237,27,36,0.3)] transition-all"></div>
                                    
                                    <item.icon className="relative z-10 w-8 h-8 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <h4 className="text-lg font-bold font-cyber text-zinc-200 group-hover:text-primary transition-colors tracking-wider mb-2">{item.title}</h4>
                                <p className="text-xs text-zinc-500 font-mono leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* System Nodes (Portal Menu) */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 mb-10">
                <div className="flex flex-col items-center mb-16">
                    <Crosshair className="w-10 h-10 text-primary-dark mb-4 animate-pulse-soft" />
                    <h2 className="text-4xl md:text-5xl font-black font-cyber text-white text-center">SYSTEM_NODES</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {[
                        { num: "SYS.01", label: "Struktur Komando", path: "/team", suffix: "EXECUTABLE" },
                        { num: "SYS.02", label: "Arsip Prestasi", path: "/prestasi", suffix: "READ_ONLY" },
                        { num: "SYS.03", label: "Log Penghargaan", path: "/awards", suffix: "READ_ONLY" },
                        { num: "SYS.04", label: "Data Project", path: "/projects", suffix: "ENCRYPTED" }
                    ].map((menu, i) => (
                        <Link 
                            key={i} 
                            to={menu.path} 
                            className="group flex items-center justify-between bg-[#0f0f0f] p-6 border-l-4 border-zinc-800 hover:border-primary hover:bg-[#151515] hover:shadow-red-glow-dark transition-all duration-300"
                        >
                            <div className="flex items-center space-x-6">
                                <span className="font-mono text-xs md:text-sm text-primary-dark group-hover:text-primary transition-colors">
                                    {menu.num}
                                </span>
                                <span className="font-cyber text-lg md:text-xl font-bold text-zinc-300 group-hover:text-white transition-colors tracking-wider">
                                    {menu.label}
                                </span>
                            </div>
                            <div className="hidden sm:flex text-[10px] items-center text-zinc-600 font-mono group-hover:text-primary/50 transition-colors">
                                [{menu.suffix}]
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Bottom visual barrier */}
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary-dark to-transparent opacity-50 relative z-10"></div>
        </div>
    );
};

export default LandingPage;
