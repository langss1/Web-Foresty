import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, logAdminAction } from '../../lib/supabase';
import { Shield, Lock, User, AlertCircle, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/Logo.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showNotice, setShowNotice] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                await logAdminAction('LOGIN_SUCCESS', { method: 'PASSWORD' }, data.user);
                setShowNotice(true);
            }
        } catch (err) {
            setError('Keamanan Gagal: ' + err.message);
            setLoading(false);
        }
    };

    const confirmAccess = () => {
        navigate('/admin/dashboard');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-6 font-sans selection:bg-red-600/30 overflow-hidden relative">
            <AnimatePresence>
                {showNotice && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-[10px]"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden"
                        >
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
                            <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">Akses Terbatas</h3>
                            <p className="text-zinc-500 text-sm font-medium mb-8 leading-relaxed">
                                Web internal untuk upload dan dokumentasi Foresty Lab.<br/>
                                <span className="text-red-500 font-bold uppercase italic tracking-wider">Restricted access, jangan dishare kepada siapapun.</span>
                            </p>
                            <button 
                                onClick={confirmAccess}
                                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-red-600/20 active:scale-95"
                            >
                                Saya Paham & Masuk Terminal
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-red-900/10 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-900/20 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03)_0%,transparent_70%)]"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                <div className="mb-10 text-center">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center justify-center mb-6"
                    >
                        <img src={logoImg} alt="Foresty Logo" className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]" />
                    </motion.div>
                    <h2 className="text-3xl font-black text-white tracking-tight mb-2 uppercase italic">Admin <span className="text-red-600">Portal</span></h2>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-center gap-3 overflow-hidden"
                            >
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                <p className="text-xs font-bold text-red-500 uppercase tracking-widest">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-red-500 transition-colors z-20" />
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    className="w-full p-4 pl-12 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm font-medium text-white focus:border-red-600 focus:outline-none transition-all placeholder:text-zinc-700 relative z-10"
                                    placeholder="admin@forestry.lab"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-red-500 transition-colors z-20" />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    className="w-full p-4 pl-12 pr-12 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm font-medium text-white focus:border-red-600 focus:outline-none transition-all placeholder:text-zinc-700 relative z-10"
                                    placeholder="••••••••••••"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white p-1 z-30 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-2xl font-black text-sm transition-all shadow-lg shadow-red-600/20 active:scale-[0.98] disabled:opacity-50 mt-4 uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : 'Login'}
                        </button>
                    </form>
                </div>

            </motion.div>
        </div>
    );
};

export default LoginPage;
