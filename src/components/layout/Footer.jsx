const Footer = () => {
    return (
        <footer className="mt-32 pt-20 pb-16 border-t border-white/5 bg-[#0a0a0c] relative selection:bg-blue-500 selection:text-white">
            <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none"></div>
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em] mb-4">Foresty Integrated Lab Node</div>
                    <div className="flex flex-wrap justify-center gap-8 mb-8">
                        <a href="#" className="text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-blue-500 transition-colors">LINKEDIN</a>
                        <a href="#" className="text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-blue-500 transition-colors">GITHUB REPO</a>
                        <a href="#" className="text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-blue-500 transition-colors">SECURE CONTACT</a>
                    </div>
                    <p className="text-[8px] font-black uppercase text-white/10 tracking-[0.2em]">© 2024 Foresty Core Project — Built For Telkom University</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
