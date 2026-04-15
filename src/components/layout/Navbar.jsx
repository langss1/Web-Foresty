import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Database, GraduationCap, Award, Users } from 'lucide-react';
import logoImg from '../../assets/Logo.png';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/team', label: 'Struktural' },
        { path: '/prestasi', label: 'Prestasi' },
        { path: '/projects', label: 'Projects' },
        { path: '/awards', label: 'Penghargaan' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#110000]/80 backdrop-blur-md border-b border-primary-dark/30 h-16 flex items-center px-10">
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                <Link to="/" className="font-bold text-xl uppercase italic text-white flex items-center gap-2">
                    <span className="text-primary-dark">FORESTY</span> LAB
                </Link>

                <div className="flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link 
                            key={item.path} 
                            to={item.path} 
                            className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                                location.pathname === item.path 
                                    ? 'text-primary drop-shadow-[0_0_8px_rgba(237,27,36,0.6)]' 
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
