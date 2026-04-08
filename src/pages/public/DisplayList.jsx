import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, Award, Briefcase, ExternalLink, Calendar, Image as ImageIcon, Users } from 'lucide-react';

const getDirectDriveLink = (url) => {
    if (!url) return '';
    // Handle Google Drive links
    if (url.includes('drive.google.com')) {
        const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/) || 
                       url.match(/id=([a-zA-Z0-9_-]{25,})/) ||
                       url.match(/\/file\/d\/([a-zA-Z0-9_-]{25,})/);
        
        if (idMatch && idMatch[1]) {
            // Option 3: lh3.googleusercontent.com (Modern, high success rate)
            return `https://lh3.googleusercontent.com/d/${idMatch[1]}=s1000`;
        }
    }
    return url;
};

const DisplayList = ({ table, title }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data: result, error } = await supabase
                .from(table)
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) console.error(error);
            else setData(result);
            setLoading(false);
        };
        fetchData();
    }, [table]);

    const filteredData = data.filter(item => {
        const titleText = item.title || item.title_achievement || item.name || '';
        const descText = item.description || item.competition_name || item.institution || '';
        return titleText.toLowerCase().includes(searchTerm.toLowerCase()) || 
               descText.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 pt-24">
            <div className="w-10 h-10 border-4 border-zinc-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Memuat database...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-white pt-24 pb-20 font-serif">
            <div className="max-w-6xl mx-auto px-5">
                {/* Basic Header */}
                <div className="border p-5 mb-10">
                    <h1 className="text-3xl font-bold uppercase mb-2">{title}</h1>
                    <p className="text-xs uppercase text-gray-500">Kategori: {table}</p>
                    
                    <div className="mt-5">
                        <input 
                            type="text" 
                            placeholder="Cari..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border p-2 text-sm"
                        />
                    </div>
                </div>

                {/* Basic Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredData.map((item) => {
                        const cardTitle = item.title || item.title_achievement || item.name;
                        const cardSub = item.description || item.competition_name || item.institution;
                        
                        return (
                            <div key={item.id} className="border p-4 bg-gray-50 flex flex-col">
                                <div className="flex justify-between border-b pb-2 mb-4">
                                    <span className="text-[10px] font-bold uppercase">{table}</span>
                                    <span className="text-[10px]">{new Date(item.created_at).getFullYear()}</span>
                                </div>

                                {table === 'prestasi' && item.photo_url && (
                                    <div className="w-full h-40 bg-gray-200 mb-4 border overflow-hidden">
                                        <img 
                                            src={getDirectDriveLink(item.photo_url)} 
                                            alt={cardTitle} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                <h2 className="font-bold mb-1">{cardTitle}</h2>
                                <p className="text-xs mb-4">{cardSub}</p>
                                
                                {(item.members || item.contributors) && (
                                    <div className="border border-dashed p-2 mb-4 text-gray-500">
                                        <p className="text-[8px] font-bold uppercase">Team:</p>
                                        <p className="text-[10px]">{item.members || item.contributors}</p>
                                    </div>
                                )}

                                <div className="mt-auto pt-4 border-t flex flex-wrap gap-2">
                                    {item.category && (
                                        <span className="border px-1 text-[8px] font-bold">{item.category}</span>
                                    )}
                                    {item.repo_link && (
                                        <a href={item.repo_link} target="_blank" rel="noopener noreferrer" className="text-[8px] font-bold underline">Link Detail</a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {filteredData.length === 0 && (
                    <div className="col-span-full py-20 text-center border border-dashed rounded-xl">
                        <p className="text-sm text-gray-400">Data tidak ditemukan</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisplayList;
