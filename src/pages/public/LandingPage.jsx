import React from 'react';
import { Link } from 'react-router-dom';
import { Database, GraduationCap, Award, Shield, Search, Crosshair, Users, BookOpen } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#110000] text-gray-200 font-sans selection:bg-primary selection:text-white pb-20">
            {/* Header/Hero Section */}
            <section className="relative w-full max-w-6xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-2 gap-10 items-center">
                {/* Subtle Red Gradients in Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-dark/30 blur-[180px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#3d0306] blur-[150px] rounded-full pointer-events-none"></div>
                
                <div className="relative z-10 space-y-6">
                    <p className="text-primary-dark text-sm tracking-widest uppercase mb-2 font-bold">Research Laboratory</p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-4">
                        FORESTY <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-100 to-primary-dark">LAB.</span>
                    </h1>
                    
                    <p className="text-gray-300 max-w-md mt-6 text-base leading-relaxed">
                        The center of excellence for cybersecurity and digital forensics technology development from the Faculty of Informatics.
                    </p>
                    
                    <div className="pt-8">
                        <Link to="/team" className="inline-block bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 text-white font-medium py-3 px-10 rounded-full shadow-[0_4px_20px_rgba(237,27,36,0.5)] hover:shadow-lg hover:-translate-y-0.5">
                            Join Us
                        </Link>
                    </div>
                </div>
                
                <div className="relative z-10 hidden lg:flex justify-end items-center">
                    <div className="relative w-[380px] h-[480px] rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#2e0505] to-[#120000] border border-primary-dark/30 shadow-2xl flex items-center justify-center p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
                        <Shield className="w-48 h-48 text-primary-dark/60" strokeWidth={0.5} />
                    </div>
                </div>
            </section>

            {/* Apa yang termasuk (What We Do / Goals) */}
            <section className="relative max-w-6xl mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center mb-16 text-white tracking-wide">Our Focus & Objectives</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                    {[
                        { num: "1", title: "Cybersecurity Research", desc: "Conducting in-depth research on the latest security trends and digital forensic analysis methods." },
                        { num: "2", title: "Study Group & CTF", desc: "A platform for students to learn collaboratively and prepare for cyber competitions like Capture The Flag." },
                        { num: "3", title: "Industrial Pentesting", desc: "Performing penetration testing and cybersecurity audits for private and industrial sectors." }
                    ].map((item, i) => (
                        <div key={i} className="relative bg-gradient-to-b from-[#280506] to-[#140001] border border-primary-dark/30 p-8 rounded-3xl text-center flex flex-col items-center hover:border-primary-dark transition-colors shadow-xl">
                            {/* Number Badge Overlap - matching image style */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-[#780105] text-white font-semibold flex items-center justify-center text-xl shadow-[0_4px_15px_rgba(237,27,36,0.6)]">
                                {item.num}
                            </div>
                            <h3 className="text-lg font-bold mt-8 mb-4 text-white">{item.title}</h3>
                            <p className="text-red-100/70 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Icons Section (Sesuai gambar "Kondisi kamu...") */}
            <section className="relative max-w-5xl mx-auto px-6 py-20 border-t border-primary-dark/20">
                {/* Background glow for this section */}
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
                            {/* Glowing Red Icon Box */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#800508] to-primary flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(237,27,36,0.4)] border border-red-500/30">
                                <item.icon className="w-7 h-7 text-white" />
                            </div>
                            <p className="text-sm text-red-100/80 leading-relaxed max-w-[200px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Menu Portal (Sesuai gaya angka besar di gambar) */}
            <section className="relative max-w-6xl mx-auto px-6 py-24 mb-10 border-t border-primary-dark/20 bg-gradient-to-b from-[#150000] to-[#0a0000]">
                <h2 className="text-3xl font-bold text-center mb-16 text-white tracking-wide">Laboratory Information Portal</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 max-w-4xl mx-auto">
                    {[
                        { num: "01.", label: "Structural Team", desc: "Get to know our core management and principal researchers.", path: "/team" },
                        { num: "02.", label: "Student Achievements", desc: "History of victories in various cyber competitions.", path: "/prestasi" },
                        { num: "03.", label: "Laboratory Awards", desc: "Institutional and public awards for research contributions.", path: "/awards" },
                        { num: "04.", label: "Projects & Research", desc: "Journal publications, papers, and project collaborations.", path: "/projects" }

                    ].map((menu, i) => (
                        <Link 
                            key={i} 
                            to={menu.path} 
                            className="group flex gap-6 items-start p-4 transition-all hover:translate-x-2 rounded-2xl hover:bg-[#300505]/50 border border-transparent hover:border-primary-dark/30"
                        >
                            <span className="text-5xl font-light text-primary group-hover:text-red-400 transition-colors font-serif drop-shadow-[0_2px_10px_rgba(237,27,36,0.3)]">
                                {menu.num}
                            </span>
                            <div className="flex flex-col mt-2">
                                <span className="text-lg font-semibold text-white mb-2">
                                    {menu.label}
                                </span>
                                <span className="text-sm text-red-100/60">
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
