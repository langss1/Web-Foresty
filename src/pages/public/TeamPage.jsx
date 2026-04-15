import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Briefcase, Code, Camera } from 'lucide-react';

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

const teamMembers = [
    {
        id: '1',
        name: 'Assoc. Prof. Dr. VERA SURYANI, S.T., M.T.',
        position: 'Dosen Pembina',
        major: 'Informatika',
        batch: 'Dosen',
        skills: 'Computer network, internet of thing',
        is_dosen: true,
        photo_url: '',
        scholar_url: 'https://scholar.google.com/citations?hl=id&user=fphVMf8AAAAJ',
        sinta_url: 'https://sinta.kemdiktisaintek.go.id/authors/profile/28717',
    },
    {
        id: '2',
        name: 'Ir. AULIA ARIF WARDANA, S.Kom., M.T.',
        position: 'Dosen Pembina',
        major: 'Informatika',
        batch: 'Dosen',
        skills: 'Network Security, Intrusion Detection, Distributed Ledger',
        is_dosen: true,
        photo_url: '',
        scholar_url: 'https://scholar.google.com/citations?user=VeQwJAsAAAAJ&hl=en',
        sinta_url: 'https://sinta.kemdiktisaintek.go.id/authors/profile/6722822',
    },
    {
        id: '3',
        name: 'Gian Maxmillian Firdaus, S.Kom., M.Kom.',
        position: 'Dosen Pembina',
        major: 'Informatika',
        batch: 'Dosen',
        skills: 'Machine learning, cybersecurity',
        is_dosen: true,
        photo_url: '',
        scholar_url: 'https://scholar.google.com/citations?user=lMde22kAAAAJ&hl=en',
        sinta_url: 'https://sinta.kemdiktisaintek.go.id/authors/profile/6979746',
    },
    {
        id: '4',
        name: 'Faisal Ihsan Santoso',
        position: 'Ketua Lab',
        major: 'S1 Teknologi Informasi',
        batch: '2023',
        skills: 'CTF, Bug Hunter',
        is_dosen: false,
        photo_url: '',
        linkedin_url: 'https://id.linkedin.com/in/faisalsan',
        github_url: 'https://github.com/CyrusSE',
        ig_url: 'https://www.instagram.com/callmecal.ok',
    },
    {
        id: '5',
        name: 'Gilang Wasis Wicaksono',
        position: 'Wakil Lab',
        major: 'S1 Teknologi Informasi',
        batch: '2023',
        skills: 'Cyber Security Forensic, OSINT, IT Audit, SoC analyst, AI, Machine Learning, Fullstack Software Development, Computer Vision, IoT',
        is_dosen: false,
        photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/gilang-wasis-wicaksono2/',
        github_url: 'https://github.com/langss1',
    },
    {
        id: '6',
        name: 'Ramadhan Tangguh Defender',
        position: 'Koordinator Akademik',
        major: 'S1 Teknologi Informasi',
        batch: '2024',
        skills: 'Cybersecurity',
        is_dosen: false,
        photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/defen',
    },
    {
        id: '7',
        name: 'Muhammad Rafli Ardiansyah',
        position: 'Anggota Akademik',
        major: 'S1 Informatika',
        batch: '2023',
        skills: 'Cybersecurity',
        is_dosen: false,
        photo_url: '',
    },
    {
        id: '8',
        name: 'Fityah Bayodiansyah Harahap',
        position: 'Anggota Akademik',
        major: 'S1 Rekayasa Perangkat Lunak',
        batch: '2024',
        skills: 'Infrastructure management',
        is_dosen: false,
        photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/fityah-bayodiansyah-harahap-578a35279',
        github_url: 'https://github.com/BbayuGt',
    },
    {
        id: '9',
        name: 'Abdul Jabbar Hawali Al Dzahabi',
        position: 'Koordinator Media',
        major: 'S1 Teknologi Informasi',
        batch: '2024',
        skills: 'Desain Grafis, UI/UX, Cybersecurity',
        is_dosen: false,
        photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/abduljabbarhawalialdzahabi',
        github_url: 'https://github.com/Xyzet29',
        ig_url: 'https://www.instagram.com/abdoeeell_/',
    },
    {
        id: '10',
        name: 'Frizanka Aryaguna',
        position: 'Anggota Media',
        major: 'S1 Teknologi Informasi',
        batch: '2023',
        skills: 'Forensics, Cryptography',
        is_dosen: false,
        photo_url: '',
        linkedin_url: 'https://id.linkedin.com/in/frizanka-aryaguna-179494292',
        github_url: 'https://github.com/Zunnkuu',
        ig_url: 'https://www.instagram.com/zankaarya._/',
    },
    {
        id: '11',
        name: 'Fazli Rabbi',
        position: 'Anggota Media',
        major: 'S1 Teknologi Informasi',
        batch: '2024',
        skills: 'Desain Grafis, Video Editing, Web Development, Game Development',
        is_dosen: false,
        photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/fazli-rabbi-11b113329/',
        github_url: 'https://github.com/lately-dev',
        ig_url: 'https://www.instagram.com/fazli.r2/',
    },
    {
        id: '12',
        name: 'Danish Felicitia',
        position: 'Bendahara',
        major: 'S1 Informatika',
        batch: '2023',
        skills: 'OSINT, Cryptography',
        is_dosen: false,
        photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/danish-felicitia',
        github_url: 'https://github.com/fairycookies',
        ig_url: 'https://www.instagram.com/moonvaleo',
    },
    {
        id: '13',
        name: 'Zaidan Kamil Munadi',
        position: 'Anggota Human Resource',
        major: 'S1 Teknologi Informasi',
        batch: '2024',
        skills: 'Critical thinking, Cyber Security, Web development',
        is_dosen: false,
        photo_url: '',
        linkedin_url: 'https://www.linkedin.com/in/zaidan-kamil-munadi',
        github_url: 'https://github.com/Danzz2706',
        ig_url: 'https://instagram.com/zaidanmunadi_',
    }
];

const TeamPage = () => {
    const [members] = useState(teamMembers);
    const [loading, setLoading] = useState(false);

    if (loading) return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 pt-24">
            <div className="w-10 h-10 border-4 border-zinc-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Memuat data tim...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-white pt-24 pb-20 font-serif">
            <div className="max-w-6xl mx-auto px-5">
                <div className="border p-5 mb-10">
                    <p className="text-[10px] uppercase font-bold text-gray-400">Database Struktural</p>
                    <h1 className="text-3xl font-bold uppercase">Tim Forestry Lab</h1>
                    <p className="text-sm">Daftar dosen pembina dan asisten laboratorium yang aktif.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {members.map((member) => (
                        <div key={member.id} className="border p-4 bg-gray-50 flex flex-col">
                            <div className="flex border-b mb-4 pb-4 items-start justify-between">
                                <div className="border w-16 h-16 bg-gray-200">
                                    {member.photo_url && (
                                        <img src={getDirectDriveLink(member.photo_url)} alt={member.name} className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold">{member.batch || 'NODE'}</p>
                                    <p className="text-[10px] uppercase border px-1">{member.major || 'FIF'}</p>
                                </div>
                            </div>

                            <h4 className="font-bold">{member.name}</h4>
                            <p className="text-[10px] italic border-b mb-4">{member.position || 'Researcher'}</p>
                            
                            {member.skills && (
                                <div className="mb-4 flex flex-wrap gap-1">
                                    {member.skills.split(',').map((skill, idx) => (
                                        <span key={idx} className="border px-1 text-[8px] uppercase">
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="mt-auto pt-4 border-t flex gap-4 text-[10px] font-bold underline flex-wrap">
                                {member.linkedin_url && <a href={member.linkedin_url} target="_blank" rel="noreferrer">LinkedIn</a>}
                                {member.github_url && <a href={member.github_url} target="_blank" rel="noreferrer">GitHub</a>}
                                {member.ig_url && <a href={member.ig_url} target="_blank" rel="noreferrer">Instagram</a>}
                                {member.scholar_url && <a href={member.scholar_url} target="_blank" rel="noreferrer">Google Scholar</a>}
                                {member.sinta_url && <a href={member.sinta_url} target="_blank" rel="noreferrer">SINTA</a>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
