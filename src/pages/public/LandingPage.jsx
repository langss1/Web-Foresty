import React from 'react';
import { Link } from 'react-router-dom';
import { Database, GraduationCap, Award, Shield, Search, Crosshair, Users, BookOpen } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#111111] text-gray-200 font-sans selection:bg-primary selection:text-white pb-20">
            {/* Header/Hero Section */}
            <section className="relative w-full max-w-6xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-2 gap-10 items-center">
                {/* Subtle Red Gradients in Background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-dark/20 blur-[150px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#1a0506] blur-[150px] rounded-full pointer-events-none"></div>
                
                <div className="relative z-10 space-y-6">
                    <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">Laboratorium Riset</p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-4">
                        FORESTY <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">LAB.</span>
                    </h1>
                    
                    <p className="text-gray-300 max-w-md mt-6 text-base leading-relaxed">
                        Pusat keunggulan pengembangan teknologi keamanan siber dan digital forensik dari Fakultas Informatika.
                    </p>
                    
                    <div className="pt-8">
                        <Link to="/team" className="inline-block bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 text-white font-medium py-3 px-10 rounded-full shadow-[0_4px_15px_rgba(237,27,36,0.4)] hover:shadow-lg hover:-translate-y-0.5">
                            Bergabung
                        </Link>
                    </div>
                </div>
                
                <div className="relative z-10 hidden lg:flex justify-end items-center">
                    <div className="relative w-[380px] h-[480px] rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-zinc-800 shadow-2xl flex items-center justify-center p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
                        <Shield className="w-48 h-48 text-primary-dark/40" strokeWidth={0.5} />
                    </div>
                </div>
            </section>

            {/* Apa yang termasuk (What We Do / Goals) */}
            <section className="relative max-w-6xl mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center mb-16 text-white tracking-wide">Fokus & Tujuan Kami</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                    {[
                        { num: "1", title: "Riset Keamanan Siber", desc: "Melakukan penelitian mendalam terkait tren keamanan terbaru dan metode analisis forensik digital." },
                        { num: "2", title: "Study Group & CTF", desc: "Wadah mahasiswa untuk belajar bersama dan mempersiapkan kompetisi siber seperti Capture The Flag." },
                        { num: "3", title: "Pentest Industri", desc: "Melakukan pengujian penetrasi dan audit keamanan siber bagi sektor privat dan industri." }
                    ].map((item, i) => (
                        <div key={i} className="relative bg-gradient-to-b from-[#1c1c1c] to-[#141414] border border-zinc-800/80 p-8 rounded-3xl text-center flex flex-col items-center hover:border-primary-dark/50 transition-colors shadow-lg">
                            {/* Number Badge Overlap - matching image style */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-semibold flex items-center justify-center text-xl shadow-[0_4px_10px_rgba(237,27,36,0.4)]">
                                {item.num}
                            </div>
                            <h3 className="text-lg font-bold mt-8 mb-4 text-white">{item.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Icons Section (Sesuai gambar "Kondisi kamu...") */}
            <section className="relative max-w-5xl mx-auto px-6 py-20 border-t border-zinc-800/50">
                <h2 className="text-2xl font-bold text-center mb-16 text-white tracking-wide">Pusat Keilmuan Kami Meliputi:</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                    {[
                        { icon: Search, desc: "Pengembangan Tools Digital Forensics Toolkit" },
                        { icon: Shield, desc: "Keamanan Infrastruktur dan Analisis Jaringan" },
                        { icon: Crosshair, desc: "Reverse Engineering dan Analisis Malware" },
                        { icon: BookOpen, desc: "Perancangan Skenario & Platform CTF" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            {/* Glowing Red Icon Box */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-dark to-primary/80 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(237,27,36,0.25)] border border-primary/20">
                                <item.icon className="w-7 h-7 text-white" />
                            </div>
                            <p className="text-sm text-zinc-300 leading-relaxed max-w-[200px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Menu Portal (Sesuai gaya angka besar di gambar) */}
            <section className="relative max-w-6xl mx-auto px-6 py-24 mb-10 border-t border-zinc-800/50">
                <h2 className="text-3xl font-bold text-center mb-16 text-white tracking-wide">Portal Informasi Lab</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 max-w-4xl mx-auto">
                    {[
                        { num: "01.", label: "Tim Struktural", desc: "Kenali pengurus inti dan peneliti utama kami.", path: "/team" },
                        { num: "02.", label: "Prestasi Mahasiswa", desc: "Riwayat kemenangan di berbagai kompetisi siber.", path: "/prestasi" },
                        { num: "03.", label: "Penghargaan Lab", desc: "Penghargaan institusi dan publik untuk kontribusi riset.", path: "/awards" },
                        { num: "04.", label: "Project & Riset", desc: "Publikasi jurnal, paper, dan kolaborasi project.", path: "/projects" }
                    ].map((menu, i) => (
                        <Link 
                            key={i} 
                            to={menu.path} 
                            className="group flex gap-6 items-start p-2 transition-all hover:translate-x-2"
                        >
                            <span className="text-5xl font-light text-primary-dark opacity-80 group-hover:text-primary transition-colors font-serif">
                                {menu.num}
                            </span>
                            <div className="flex flex-col mt-2">
                                <span className="text-lg font-semibold text-white mb-2">
                                    {menu.label}
                                </span>
                                <span className="text-sm text-gray-400">
                                    {menu.desc}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
