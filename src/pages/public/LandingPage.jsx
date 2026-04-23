import React from 'react';
import { Link } from 'react-router-dom';
import { Database, GraduationCap, Award, Shield, Search, Crosshair, BookOpen, Key } from 'lucide-react';
import { motion } from 'framer-motion';
import maskotImg from '../../assets/Maskot.png';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#110000] text-gray-200 font-sans selection:bg-primary selection:text-white overflow-x-hidden relative">
            {/* Global Scanline Effect */}
            <div className="scanline-bar"></div>
            
            {/* Header/Hero Section */}
            <section className="relative w-full">
                {/* Global Background Animation for Hero - RESTORED BOLD LOOK */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 md:opacity-30">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute z-0"
                    >
                        <Shield className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] text-primary-dark/50" strokeWidth={0.5} />
                    </motion.div>

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] flex items-center justify-center pointer-events-none"
                    >
                        {/* Key Icon - representing encryption */}
                        <motion.div 
                            className="absolute top-[5%] left-[20%] text-primary/70"
                            animate={{ rotate: -360 }} 
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                            <Key className="w-16 h-16 md:w-24 md:h-24" />
                        </motion.div>
                        
                        {/* Crosshair Icon - representing pentest/targeting */}
                        <motion.div 
                            className="absolute bottom-[15%] right-[10%] text-primary/80"
                            animate={{ rotate: -360 }} 
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                            <Crosshair className="w-20 h-20 md:w-32 md:h-32" />
                        </motion.div>
                        
                        {/* Search Icon - representing forensics/analysis */}
                        <motion.div 
                            className="absolute top-[30%] right-[3%] text-primary/50"
                            animate={{ rotate: -360 }} 
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                            <Search className="w-14 h-14 md:w-20 md:h-20" />
                        </motion.div>
                        
                        {/* Database Icon - representing data security */}
                        <motion.div 
                            className="absolute bottom-[20%] left-[8%] text-primary-dark/60"
                            animate={{ rotate: -360 }} 
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                            <Database className="w-16 h-16 md:w-24 md:h-24" />
                        </motion.div>
                    </motion.div>
                </div>

                <div className="relative max-w-6xl mx-auto px-6 pt-40 pb-32 z-10 grid lg:grid-cols-2 gap-10 items-center">
                    <div className="max-w-xl space-y-6">
                        <p className="text-primary-dark text-sm tracking-widest uppercase mb-2 font-bold drop-shadow-md">Research Laboratory</p>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-white mb-4 drop-shadow-2xl">
                            FORESTY <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-primary">LAB.</span>
                        </h1>
                        
                        <p className="text-gray-200 max-w-xl mt-6 text-lg md:text-xl leading-relaxed drop-shadow-md">
                            The center of excellence for cybersecurity and digital forensics technology development from the Faculty of Informatics.
                        </p>
                        
                        <div className="pt-8">
                            <Link to="/team" className="inline-block bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 text-white font-semibold py-4 px-12 rounded-full shadow-[0_4px_30px_rgba(237,27,36,0.5)] hover:shadow-[0_4px_35px_rgba(237,27,36,0.8)] hover:-translate-y-1">
                                Join Us
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end items-center relative z-20">
                        <motion.div
                            animate={{ y: [-15, 15, -15] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="relative flex items-center justify-center p-4"
                        >
                            {/* Glow Effect behind mascot */}
                            <div className="absolute w-[100%] h-[100%] bg-primary/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>
                            <img 
                                src={maskotImg} 
                                alt="Foresty Lab Mascot" 
                                className="w-[280px] md:w-[380px] lg:w-[420px] h-auto object-contain relative z-30 drop-shadow-[0_0_40px_rgba(237,27,36,0.4)]"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Apa yang termasuk (What We Do / Goals) */}
            <section className="relative w-full py-24 bg-grid-red border-t border-primary-dark/10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-16 justify-center">
                        <div className="h-[1px] w-12 bg-primary/30"></div>
                        <h2 className="text-3xl font-bold text-white tracking-widest font-cyber uppercase">
                            <span className="text-primary opacity-70">SEC_</span>FOCUS_OBJECTIVES
                        </h2>
                        <div className="h-[1px] w-12 bg-primary/30"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { num: "01", title: "Cybersecurity Research", desc: "Conducting in-depth research on the latest security trends and digital forensic analysis methods." },
                            { num: "02", title: "Study Group & CTF", desc: "A platform for students to learn collaboratively and prepare for cyber competitions like Capture The Flag." },
                            { num: "03", title: "Industrial Pentesting", desc: "Performing penetration testing and cybersecurity audits for private and industrial sectors." }
                        ].map((item, i) => (
                            <div key={i} className="relative bg-[#0d0000] border border-primary-dark/20 p-10 rounded-lg group hover:border-primary/40 transition-all duration-500 overflow-hidden">
                                {/* Cyber Decor */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                
                                {/* Terminal Style Number */}
                                <div className="inline-block mb-8 px-3 py-1 bg-[#1a0000] border border-primary/30 text-primary font-mono text-xs tracking-tighter shadow-[0_0_15px_rgba(237,27,36,0.1)]">
                                    [ REF_ID_{item.num} ]
                                </div>
                                
                                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300 font-cyber flex items-center gap-3">
                                    <span className="text-primary text-sm font-mono mt-1 opacity-60">&gt;&nbsp;</span>
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed font-sans">{item.desc}</p>
                                
                                {/* Bottom Corner Decor */}
                                <div className="absolute bottom-2 right-2 flex gap-1 items-center opacity-30 group-hover:opacity-100 transition-opacity">
                                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-mono text-gray-500">CONNECTED</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Icons Section (Sesuai gambar "Kondisi kamu...") */}
            <section className="relative max-w-5xl mx-auto px-6 py-20 border-t border-primary-dark/20">
                <div className="absolute inset-0 bg-[#250103] opacity-50 pointer-events-none -z-10"></div>
                <h2 className="text-2xl font-bold text-center mb-16 text-white tracking-wide">Our Areas of Expertise Include:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                    {[
                        { icon: Search, desc: "Digital Forensics Toolkit Development" },
                        { icon: Shield, desc: "Infrastructure Security and Network Analysis" },
                        { icon: Crosshair, desc: "Reverse Engineering and Malware Analysis" },
                        { icon: BookOpen, desc: "CTF Scenario & Platform Design" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#800508] to-primary flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(237,27,36,0.4)] border border-red-500/30">
                                <item.icon className="w-7 h-7 text-white" />
                            </div>
                            <p className="text-sm text-red-100/80 leading-relaxed max-w-[200px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Menu Portal (Sesuai gaya angka besar di gambar) */}
            <section className="relative w-full py-24 border-t border-primary-dark/20 bg-grid-red">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-20 justify-center">
                        <div className="h-[1px] w-12 bg-primary/30"></div>
                        <h2 className="text-3xl font-bold text-white tracking-widest font-cyber uppercase">
                            <span className="text-primary opacity-70">SYS_</span>ACCESS_PORTAL
                        </h2>
                        <div className="h-[1px] w-12 bg-primary/30"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 max-w-4xl mx-auto">
                        {[
                            { num: "01", label: "Structural Team", desc: "Get to know our core management and principal researchers.", path: "/team" },
                            { num: "02", label: "Student Achievements", desc: "History of victories in various cyber competitions.", path: "/prestasi" },
                            { num: "03", label: "Laboratory Awards", desc: "Institutional and public awards for research contributions.", path: "/awards" },
                            { num: "04", label: "Projects & Research", desc: "Journal publications, papers, and project collaborations.", path: "/projects" }
                        ].map((menu, i) => (
                            <Link 
                                key={i} 
                                to={menu.path} 
                                className="group flex gap-8 items-start p-8 transition-all relative overflow-hidden rounded-lg bg-[#0a0000] border border-primary-dark/10 hover:border-primary/40 hover:bg-[#150000]/60"
                            >
                                {/* Background Accent */}
                                <div className="absolute top-0 right-0 px-2 py-0.5 bg-primary/10 font-mono text-[8px] text-primary/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                    AUTH_REQUIRED
                                </div>

                                <div className="flex flex-col items-center">
                                    <span className="text-6xl font-mono text-primary group-hover:text-cyber-red transition-all duration-500 font-bold opacity-30 group-hover:opacity-100 tracking-tighter">
                                        {menu.num}
                                    </span>
                                    <div className="w-full h-[1px] bg-primary/20 group-hover:bg-primary/50 transition-colors mt-2"></div>
                                </div>
                                <div className="flex flex-col mt-2">
                                    <span className="text-xl font-bold text-white mb-2 font-cyber tracking-tight group-hover:text-primary transition-colors">
                                        <span className="text-primary font-mono text-sm mr-2">{">"}</span>{menu.label}
                                    </span>
                                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                                        {menu.desc}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
