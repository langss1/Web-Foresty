import React from 'react';
import { Link } from 'react-router-dom';
import { Database, GraduationCap, Award, Shield, Key, Search, Terminal, Crosshair, Users, Target } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-primary selection:text-white pb-20">
            {/* Header/Hero Section */}
            <section className="relative w-full max-w-6xl mx-auto px-6 pt-32 pb-24 grid md:grid-cols-2 gap-10 items-center">
                {/* Red Gradient Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-dark opacity-30 blur-[150px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
                
                <div className="relative z-10 space-y-6">
                    <p className="text-gray-400 text-sm tracking-widest uppercase">Laboratorium Riset Telkom University</p>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight font-cyber">
                        FORESTY <br />
                        <span className="text-primary-dark">LAB.</span>
                    </h1>
                    <p className="text-gray-300 max-w-md mt-4 text-base leading-relaxed">
                        Cybersecurity and Digital Forensic Lab di bawah naungan Kelompok Keahlian CITI (Cyber Infrastructure and Trusted Intelligence) Fakultas Informatika.
                    </p>
                    <div className="pt-6">
                        <Link to="/team" className="inline-block bg-primary hover:bg-primary-dark transition-all duration-300 text-white font-semibold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(237,27,36,0.3)] hover:shadow-[0_0_30px_rgba(178,41,48,0.6)]">
                            Bergabung Bersama Kami
                        </Link>
                    </div>
                </div>
                
                <div className="relative z-10 hidden md:flex justify-center items-center">
                    {/* Placeholder for an image or artistic element */}
                    <div className="relative w-[80%] aspect-square rounded-2xl overflow-hidden border border-zinc-800/50 bg-[#161616] p-8 flex items-center justify-center shadow-2xl">
                        <Shield className="w-48 h-48 text-primary-dark opacity-50" strokeWidth={1} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* What We Do Section (Numbered Cards) */}
            <section className="relative max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/30">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-cyber">Apa saja yang kami lakukan?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                    {[
                        { num: "1", title: "Riset Keamanan Siber", desc: "Melakukan penelitian mendalam terkait tren keamanan siber terbaru dan metode analisis forensik." },
                        { num: "2", title: "Mencetak Talenta", desc: "Mentoring dan study group bagi mahasiswa untuk mempersiapkan kompetisi siber dan CTF nasional." },
                        { num: "3", title: "Pentest Industri", desc: "Pengujian penetrasi dan audit keamanan infrastruktur jaringan bagi sektor industri dan publik." }
                    ].map((item, i) => (
                        <div key={i} className="relative bg-[#1a1a1a] border border-zinc-800 p-8 rounded-2xl text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                            {/* Number Badge Overlap */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-bold flex items-center justify-center text-xl shadow-[0_0_15px_rgba(237,27,36,0.5)]">
                                {item.num}
                            </div>
                            <h3 className="text-xl font-bold mt-6 mb-4 text-white">{item.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Goals & Focus (Icons Grid) */}
            <section className="relative max-w-5xl mx-auto px-6 py-20 border-t border-zinc-800/30">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-cyber">Fokus & Tujuan Kami</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                    {[
                        { icon: Terminal, title: "Tools Forensik", desc: "Pengembangan Tools Forensik Digital" },
                        { icon: Shield, title: "Keamanan Jaringan", desc: "Keamanan Infrastruktur & Analisis Serangan" },
                        { icon: Search, title: "Analisis Malware", desc: "Membedah dan mengisolasi insiden siber" },
                        { icon: Crosshair, title: "CTF Maker", desc: "Membuat soal latihan keamanan siber berkualitas" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-dark/80 to-primary/80 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(178,41,48,0.4)]">
                                <item.icon className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Portal Menu (Large Numbers Layout) */}
            <section className="relative max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/30">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-cyber">Portal Informasi Lab</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
                    {[
                        { num: "01.", label: "Struktur Organisasi", path: "/team" },
                        { num: "02.", label: "Daftar Prestasi", path: "/prestasi" },
                        { num: "03.", label: "Penghargaan Lab", path: "/awards" },
                        { num: "04.", label: "Project & Riset", path: "/projects" }
                    ].map((menu, i) => (
                        <Link key={i} to={menu.path} className="group flex items-center space-x-6 bg-[#161616]/50 p-6 rounded-2xl border border-zinc-800/50 hover:border-primary-dark/50 transition-colors">
                            <span className="text-5xl font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary-dark/50 group-hover:scale-110 transition-transform duration-300">
                                {menu.num}
                            </span>
                            <span className="text-lg font-semibold text-zinc-300 group-hover:text-white transition-colors">
                                {menu.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
