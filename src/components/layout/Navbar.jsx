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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black h-16 flex items-center px-10">
            <div className="flex items-center justify-between w-full">
                <Link to="/" className="font-bold text-xl uppercase italic">
                    Foresty Lab
                </Link>

                <div className="flex items-center gap-5">
                    {navItems.map((item) => (
                        <Link 
                            key={item.path} 
                            to={item.path} 
                            className={`text-xs font-bold uppercase ${location.pathname === item.path ? 'underline' : ''}`}
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
