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
        name: 'Dr. Ahmad Stevano',
        position: 'Kepala Laboratorium',
        major: 'S1 Informatika',
        batch: 'Dosen',
        skills: 'Cyber Security, Digital Forensic',
        is_dosen: true,
        photo_url: '',
        linkedin_url: '#',
    },
    {
        id: '2',
        name: 'Gilang Pradana',
        position: 'Koordinator Aslab',
        major: 'S1 Informatika',
        batch: '2021',
        skills: 'Web Sec, Penetration Testing',
        is_dosen: false,
        photo_url: '',
        github_url: '#',
    },
    {
        id: '3',
        name: 'Rizwan Hakim',
        position: 'Asisten Laboratorium',
        major: 'S1 Informatika',
        batch: '2022',
        skills: 'Network Security, SOC',
        is_dosen: false,
        photo_url: '',
        ig_url: '#',
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

                            <div className="mt-auto pt-4 border-t flex gap-4 text-[10px] font-bold underline">
                                {member.linkedin_url && <a href={member.linkedin_url} target="_blank" rel="noreferrer">LinkedIn</a>}
                                {member.github_url && <a href={member.github_url} target="_blank" rel="noreferrer">GitHub</a>}
                                {member.ig_url && <a href={member.ig_url} target="_blank" rel="noreferrer">Instagram</a>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
