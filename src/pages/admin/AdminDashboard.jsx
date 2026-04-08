import { useEffect, useState } from 'react';
import { supabase, logAdminAction } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Database,
    GraduationCap,
    Award,
    Activity,
    LogOut,
    Plus,
    Trash2,
    Edit3,
    Shield,
    Monitor,
    AlertCircle,
    CheckCircle2,
    Upload,
    Calendar,
    Cpu,
    Globe
} from 'lucide-react';
import logoImg from '../../assets/Logo.png';
import handImg from '../../assets/Hand.png';
import bookImg from '../../assets/Book.png';
import laptopImg from '../../assets/Laptop.png';

const AdminDashboard = () => {
    const { user, signOut } = useAuth();
    const [activeTab, setActiveTab] = useState('projects');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({});
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showConfirm, setShowConfirm] = useState(null); // 'save' or 'delete'
    const [pendingAction, setPendingAction] = useState(null);

    const menuItems = [
        { id: 'projects', label: 'Projects & Riset', icon: Database },
        { id: 'prestasi', label: 'Prestasi', icon: GraduationCap },
        { id: 'awards', label: 'Penghargaan', icon: Award },
    ];

    useEffect(() => {
        const cleanupAndFetch = async () => {
            // Delete logs older than 14 days
            const twoWeeksAgo = new Date();
            twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
            
            await supabase
                .from('admin_logs')
                .delete()
                .lt('created_at', twoWeeksAgo.toISOString());
            
            resetForm();
            fetchData();
        };
        cleanupAndFetch();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const { data, error } = await supabase
                .from(activeTab)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (err) {
            setError('Gagal memuat data: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (file) => {
        if (!file) return null;
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `${activeTab}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('IMAGES')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('IMAGES')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading file:', error.message);
            throw new Error('Gagal mengupload gambar: ' + error.message);
        }
    };

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            let photoUrl = formData.photo_url;

            if (selectedFile && activeTab === 'prestasi') {
                setUploading(true);
                photoUrl = await handleFileUpload(selectedFile);
                setUploading(false);
            }

            // ONLY include photo_url if the table actually has it (prestasi)
            const payload = { ...formData, user_id: user?.id };
            if (activeTab === 'prestasi') {
                payload.photo_url = photoUrl;
            } else {
                // EXPLICITLY delete photo_url and any other non-existent columns from payload
                delete payload.photo_url;
                delete payload.selectedFile; // cleaning up just in case
            }

            if (editingId) {
                const { error } = await supabase.from(activeTab).update(payload).eq('id', editingId);
                if (error) throw error;
                await logAdminAction(`UPDATE_${activeTab.toUpperCase()}`, { title: formData.title || formData.name || formData.title_achievement }, user);
                setSuccess('Data berhasil diperbarui');
            } else {
                const { error } = await supabase.from(activeTab).insert([payload]);
                if (error) throw error;
                await logAdminAction(`CREATE_${activeTab.toUpperCase()}`, { title: formData.title || formData.name || formData.title_achievement }, user);
                setSuccess('Data berhasil ditambahkan');
            }
            resetForm();
            fetchData();
        } catch (err) {
            setError('Gagal menyimpan data: ' + err.message);
        } finally {
            setLoading(false);
            setShowConfirm(null);
        }
    };

    const handleDelete = async (id) => {
        const itemToDelete = items.find(i => i.id === id);
        setPendingAction(() => async () => {
            setLoading(true);
            try {
                const { error } = await supabase.from(activeTab).delete().eq('id', id);
                if (error) throw error;
                await logAdminAction(`DELETE_${activeTab.toUpperCase()}`, { title: itemToDelete?.title || itemToDelete?.name || 'Unknown' }, user);
                fetchData();
                setSuccess('Data berhasil dihapus');
            } catch (err) {
                setError('Gagal menghapus data: ' + err.message);
            } finally {
                setLoading(false);
                setShowConfirm(null);
            }
        });
        setShowConfirm('delete');
    };

    const handleClearLogs = async () => {
        setPendingAction(() => async () => {
            setLoading(true);
            try {
                const { error } = await supabase.from('admin_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
                if (error) throw error;
                await logAdminAction('CLEAR_LOGS', { reason: 'Manual cleanup' }, user);
                setSuccess('Semua log berhasil dibersihkan');
                fetchData();
            } catch (err) {
                setError('Gagal membersihkan log: ' + err.message);
            } finally {
                setLoading(false);
                setShowConfirm(null);
            }
        });
        setShowConfirm('clear');
    };

    const startEdit = (item) => {
        setEditingId(item.id);
        const { id, created_at, user_id, ...cleanData } = item;
        setFormData(cleanData);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        const defaultFields = {
            projects: { title: '', description: '', contributors: '', repo_link: '' },
            prestasi: { title_achievement: '', competition_name: '', category: 'Nasional', members: '', photo_url: '' },
            awards: { title: '', institution: '', contributors: '' },
        };
        setFormData(defaultFields[activeTab] || {});
        setEditingId(null);
        setSelectedFile(null);
    };

    const renderInput = (key, label, type = "text", placeholder = "") => (
        <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{label}</label>
            {type === "textarea" ? (
                <textarea
                    value={formData[key] || ''}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:outline-none text-zinc-100 placeholder:text-zinc-600 transition-all min-h-[120px]"
                    placeholder={placeholder}
                />
            ) : (
                <input
                    type={type}
                    value={formData[key] || ''}
                    onChange={(e) => setFormData({ ...formData, [key]: type === 'checkbox' ? e.target.checked : e.target.value })}
                    className={`${type === 'checkbox' ? 'w-5 h-5 accent-red-600 cursor-pointer' : 'w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:outline-none text-zinc-100 placeholder:text-zinc-600 transition-all'}`}
                    placeholder={placeholder}
                />
            )}
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-600/30">
            {/* Sidebar - Corporate Dark Mode */}
            <div className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
                <div className="p-8 flex items-center gap-4">
                    <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
                    <div>
                        <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">Foresty</h1>
                        <p className="text-[8px] font-bold text-red-600 uppercase tracking-[0.3em]">Admin Web</p>
                    </div>
                </div>

                <nav className="flex-grow p-4 flex flex-col gap-1">
                    <p className="px-3 py-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">Operations</p>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all relative group overflow-hidden ${activeTab === item.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            {activeTab === item.id && (
                                <motion.div layoutId="sidebar-active" className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800" />
                            )}
                            <item.icon className={`w-4 h-4 relative z-10 ${activeTab === item.id ? 'text-white' : 'group-hover:text-red-500'}`} />
                            <span className="relative z-10 uppercase tracking-widest">{item.label}</span>
                        </button>
                    ))}

                    <div className="mt-6 pt-6 border-t border-zinc-900">
                        <p className="px-3 py-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">Systems</p>
                        <button
                            onClick={() => setActiveTab('admin_logs')}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all relative group ${activeTab === 'admin_logs' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            {activeTab === 'admin_logs' && (
                                <motion.div layoutId="sidebar-active" className="absolute inset-0 bg-zinc-800" />
                            )}
                            <Activity className={`w-4 h-4 relative z-10 ${activeTab === 'admin_logs' ? 'text-red-500' : 'group-hover:text-red-500'}`} />
                            <span className="relative z-10 uppercase tracking-widest">Audit Logs</span>
                        </button>
                    </div>
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <button
                        onClick={signOut}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-red-500 hover:bg-red-500/5 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Keluar Sesi
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow overflow-y-auto bg-zinc-950 p-6 md:p-10">
                <div className="max-w-5xl mx-auto">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-white capitalize">{activeTab.replace('_', ' ')}</h2>
                            <p className="text-sm text-zinc-500 mt-1">Kelola data dan informasi laboratorium Foresty</p>
                        </div>
                        <div className="flex items-center gap-4 bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800">
                            <Monitor className="w-4 h-4 text-zinc-500" />
                            <span className="text-xs font-medium text-zinc-300">{user?.email}</span>
                        </div>
                    </header>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-500 text-sm animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3 text-emerald-500 text-sm animate-in fade-in slide-in-from-top-2">
                            <CheckCircle2 className="w-4 h-4" />
                            {success}
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {activeTab !== 'admin_logs' ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                {/* Form Section */}
                                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-sm">
                                    <div className="flex items-center gap-2 mb-6 text-zinc-100">
                                        <Plus className="w-4 h-4 text-red-500" />
                                        <h3 className="text-sm font-bold uppercase tracking-wider">{editingId ? 'Edit Data' : 'Tambah Data Baru'}</h3>
                                    </div>

                                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {activeTab === 'projects' && (
                                            <>
                                                {renderInput('title', 'Judul Proyek', 'text', 'Contoh: Analisis Lalu Lintas Jaringan')}
                                                {renderInput('repo_link', 'Link Repository / Source', 'text', 'https://github.com/...')}
                                                <div className="md:col-span-2">
                                                    {renderInput('description', 'Deskripsi Teknis', 'textarea', 'Jelaskan tujuan dan hasil riset...')}
                                                </div>
                                                <div className="md:col-span-2">
                                                    {renderInput('contributors', 'Kontributor / Aslab', 'text', 'Nama anggota yang terlibat...')}
                                                </div>
                                            </>
                                        )}

                                        {activeTab === 'prestasi' && (
                                            <>
                                                {renderInput('title_achievement', 'Judul Prestasi', 'text', 'Contoh: Juara 1 Nasional')}
                                                {renderInput('competition_name', 'Nama Kompetisi', 'text', 'Contoh: Gemastik 2024')}
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Kategori</label>
                                                    <select
                                                        value={formData.category || 'Nasional'}
                                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                        className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:outline-none text-zinc-100 transition-all cursor-pointer"
                                                    >
                                                        <option value="Regional">Regional</option>
                                                        <option value="Nasional">Nasional</option>
                                                        <option value="Internasional">Internasional</option>
                                                    </select>
                                                </div>
                                                {renderInput('members', 'Nama Pemenang', 'text', 'Contoh: John Doe, Jane Doe')}
                                                <div className="md:col-span-2">
                                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Upload Bukti / Foto (Direct)</label>
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex items-center justify-center w-full">
                                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-700 border-dashed rounded-lg cursor-pointer bg-zinc-800/50 hover:bg-zinc-800 transition-all group">
                                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                    <Upload className={`w-8 h-8 mb-3 ${selectedFile ? 'text-emerald-500' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                                                                    <p className="mb-1 text-sm text-zinc-400 font-medium">
                                                                        {selectedFile ? selectedFile.name : 'Klik untuk upload file'}
                                                                    </p>
                                                                    <p className="text-xs text-zinc-500 uppercase tracking-tighter">PNG, JPG, JPEG (Max 2MB)</p>
                                                                </div>
                                                                <input
                                                                    type="file"
                                                                    className="hidden"
                                                                    accept="image/*"
                                                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                                                />
                                                            </label>
                                                        </div>
                                                        {formData.photo_url && !selectedFile && (
                                                            <div className="flex items-center gap-3 p-3 bg-zinc-800/30 border border-zinc-700 rounded-lg">
                                                                <div className="w-10 h-10 rounded overflow-hidden bg-zinc-900 border border-zinc-700">
                                                                    <img src={formData.photo_url} alt="Preview" className="w-full h-full object-cover" />
                                                                </div>
                                                                <span className="text-xs text-zinc-500 truncate italic">File lama terdeteksi (biarkan jika tidak ganti)</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {activeTab === 'awards' && (
                                            <>
                                                {renderInput('title', 'Nama Penghargaan', 'text', 'Contoh: Best Cyber Lab 2024')}
                                                {renderInput('institution', 'Lembaga Pemberi', 'text', 'Contoh: Telkom University')}
                                                <div className="md:col-span-2">
                                                    {renderInput('contributors', 'Penerima', 'text', 'Nama individu atau tim')}
                                                </div>
                                            </>
                                        )}



                                        <div className="md:col-span-2 flex justify-end gap-3 mt-6">
                                            {editingId && (
                                                <button 
                                                    type="button" 
                                                    onClick={resetForm} 
                                                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                                                >
                                                    Batal
                                                </button>
                                            )}
                                            <button 
                                                type="button" 
                                                onClick={() => setShowConfirm('save')}
                                                disabled={loading || uploading} 
                                                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
                                            >
                                                {loading ? 'Processing...' : editingId ? 'Simpan Perubahan' : 'Tambah Data'}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Table Section */}
                                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-zinc-800/50 border-b border-zinc-800">
                                                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Informasi Utama</th>
                                                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Waktu Input</th>
                                                    <th className="px-6 py-4 text-right text-xs font-bold text-zinc-400 uppercase tracking-widest">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-800">
                                                {items.map(item => (
                                                    <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <p className="font-semibold text-zinc-100">{item.title || item.name || item.title_achievement}</p>
                                                            <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{item.description || item.competition_name || item.position}</p>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <p className="text-xs text-zinc-400 font-mono">{new Date(item.created_at).toLocaleDateString()}</p>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <button onClick={() => startEdit(item)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/5 rounded transition-all">
                                                                    <Edit3 className="w-4 h-4" />
                                                                </button>
                                                                <button onClick={() => handleDelete(item.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/5 rounded transition-all">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {items.length === 0 && !loading && (
                                                    <tr>
                                                        <td colSpan="3" className="px-6 py-20 text-center">
                                                            <p className="text-sm text-zinc-600 italic uppercase tracking-widest">Belum ada data tersedia</p>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            /* Audit Logs View */
                            <motion.div
                                key="logs"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
                            >
                                <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">System Audit Log</h3>
                                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Hanya Aktivitas Log Masuk</p>
                                    </div>
                                    <button 
                                        onClick={handleClearLogs}
                                        className="px-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border border-red-600/20 active:scale-95"
                                    >
                                        Bersihkan Data
                                    </button>
                                </div>
                                <div className="divide-y divide-zinc-900 border-t border-zinc-900">
                                    {items.filter(item => item.action === 'LOGIN_SUCCESS').map((log) => (
                                        <div key={log.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-red-500/[0.02] transition-colors group">
                                            <div className="flex items-start gap-5">
                                                <div className="p-3 bg-zinc-800 rounded-2xl group-hover:bg-red-900/20 transition-colors">
                                                    <Activity className="w-5 h-5 text-red-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-white uppercase tracking-widest">Log Masuk</p>
                                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                                                        {log.user_email} • {new Date(log.created_at).toLocaleString()}
                                                    </p>
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        <span className="px-2 py-0.5 bg-zinc-950 text-[9px] font-bold text-zinc-600 uppercase tracking-tighter rounded border border-zinc-800 flex items-center gap-1 group-hover:text-red-400 transition-colors">
                                                            <Cpu className="w-2.5 h-2.5" />
                                                            {log.details?.device?.platform || 'Terminal'}
                                                        </span>
                                                        <span className="px-2 py-0.5 bg-zinc-950 text-[9px] font-bold text-zinc-600 uppercase tracking-tighter rounded border border-zinc-800 flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                                                            <Monitor className="w-2.5 h-2.5" />
                                                            {log.details?.device?.screen || 'DPI View'}
                                                        </span>
                                                        <span className="px-2 py-0.5 bg-zinc-950 text-[9px] font-bold text-zinc-600 uppercase tracking-tighter rounded border border-zinc-800 flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                                                            <Globe className="w-2.5 h-2.5" />
                                                            {log.details?.device?.language || 'UTF-8'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col md:items-end gap-2 shrink-0">
                                                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-900 min-w-[180px]">
                                                    <p className="text-[8px] text-zinc-700 font-black uppercase tracking-[0.3em] mb-1">Target Resource</p>
                                                    <p className="text-[10px] text-zinc-500 font-medium italic">
                                                        {log.details?.title ? log.details.title : 'Internal Metadata System'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {items.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-20 text-center">
                                            <img src={laptopImg} alt="No Logs" className="w-32 h-32 opacity-20 grayscale mb-6" />
                                            <p className="text-zinc-600 font-black uppercase tracking-[0.2em]">Operational logs cleared</p>
                                            <p className="text-xs text-zinc-800 mt-2 italic">(Auto-Purge active: 14 days cycle)</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {/* Custom Floating Confirmation Modal */}
            <AnimatePresence>
                {showConfirm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowConfirm(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${showConfirm === 'delete' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                {showConfirm === 'delete' ? <Trash2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                                {showConfirm === 'delete' ? 'Hapus Data?' : showConfirm === 'clear' ? 'Bersihkan Log?' : 'Simpan Data?'}
                            </h3>
                            <p className="text-zinc-500 text-sm font-medium mb-8">
                                {showConfirm === 'delete' 
                                    ? 'Aksi ini tidak dapat dibatalkan. Data akan dihapus permanen dari server.' 
                                    : showConfirm === 'clear'
                                    ? 'Seluruh riwayat log aktivitas akan dihapus permanen untuk mengoptimalkan database.'
                                    : 'Pastikan seluruh input sudah benar sebelum menyimpannya ke database.'}
                            </p>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setShowConfirm(null)}
                                    className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                                >
                                    Batal
                                </button>
                                <button 
                                    onClick={showConfirm === 'delete' || showConfirm === 'clear' ? pendingAction : handleSave}
                                    className={`flex-1 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${showConfirm === 'delete' || showConfirm === 'clear' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                                >
                                    {showConfirm === 'delete' ? 'Hapus' : showConfirm === 'clear' ? 'Bersihkan' : 'Konfirmasi'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
