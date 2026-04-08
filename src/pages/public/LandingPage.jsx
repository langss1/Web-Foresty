import React from 'react';
import { Link } from 'react-router-dom';
import { Database, GraduationCap, Award, Shield } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white text-black font-serif p-10 mt-20">
            {/* About Section */}
            <section className="mb-10 border p-5">
                <h1 className="text-2xl font-bold border-b pb-2 mb-4">Tentang Foresty Lab</h1>
                <p>
                    Forestry Cybersecurity and Digital Forensic Lab merupakan laboratorium riset yang berada di bawah naungan 
                    Telkom University, khususnya di bawah Kelompok Keahlian CITI (Cyber Infrastructure and Trusted Intelligence) dan 
                    FIF (Fakultas Informatika).
                </p>
            </section>

            {/* Goals & Focus Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                <div className="border p-5">
                    <h2 className="font-bold border-b mb-2 uppercase text-xs">Goals</h2>
                    <p className="text-sm">
                        Menjadi pusat keunggulan dalam pengembangan teknologi keamanan siber dan digital forensik yang mampu bersaing di tingkat internasional serta melahirkan talenta profesional.
                    </p>
                </div>
                <div className="border p-5">
                    <h2 className="font-bold border-b mb-2 uppercase text-xs">Our Focus</h2>
                    <ul className="text-sm list-disc ml-5">
                        <li>Pengembangan Tools Forensik Digital</li>
                        <li>Keamanan Infrastruktur Jaringan</li>
                        <li>Analisis Malware dan Insiden Siber</li>
                    </ul>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="mb-10 border p-5">
                <h2 className="text-center font-bold mb-5 border-b pb-2">What We Do</h2>
                <div className="space-y-2">
                    {[
                        { title: "Research about cyber & forensic", desc: "Melakukan penelitian mendalam terkait tren keamanan siber terbaru dan metode analisis forensik digital pada berbagai platform." },
                        { title: "Mentoring and study group about cyber & forensic", desc: "Wadah bagi mahasiswa untuk belajar bersama, berbagi ilmu, dan mempersiapkan kompetisi siber." },
                        { title: "CTF Maker", desc: "Pembuatan soal-soal Capture The Flag (CTF) berkualitas untuk berbagai level kompetisi siber." },
                        { title: "CTF Talent", desc: "Pusat pengembangan talenta berbakat untuk mewakili instansi dalam lomba siber nasional maupun internasional." },
                        { title: "Pen tester dan bug bounty untuk industri", desc: "Melakukan pengujian penetrasi dan audit keamanan siber bagi sektor industri dan publik." },
                        { title: "Others", desc: "Kegiatan lainnya terkait pengabdian masyarakat dan kerjasama strategis di bidang siber." }
                    ].map((item, i) => (
                        <div key={i} className="p-3 border">
                            <h3 className="font-bold text-xs uppercase">{item.title}</h3>
                            <p className="text-xs italic">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom Menu Section */}
            <section className="border p-5">
                <h2 className="text-center font-bold mb-5 text-xs">MENU PORTAL</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                        { label: "Struktural", path: "/team", icon: Shield },
                        { label: "Prestasi", path: "/prestasi", icon: GraduationCap },
                        { label: "Penghargaan", path: "/awards", icon: Award },
                        { label: "Project & Riset", path: "/projects", icon: Database }
                    ].map((menu, i) => (
                        <Link 
                            key={i} 
                            to={menu.path}
                            className="p-4 border text-center hover:bg-gray-100 block"
                        >
                            <span className="text-xs font-bold uppercase">{menu.label}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
