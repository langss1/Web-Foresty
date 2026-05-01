import { Link } from 'react-router-dom';
import logoImg from '../../assets/Logo.png';
import { ArrowRight, MapPin, Mail, ExternalLink } from 'lucide-react';


const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const LiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const NAV_COLS = [
  {
    title: 'Portal',
    links: [
      { to: '/', label: 'Beranda' },
      { to: '/team', label: 'Tim Struktural' },
      { to: '/prestasi', label: 'Prestasi' },
      { to: '/projects', label: 'Proyek & Riset' },
      { to: '/awards', label: 'Penghargaan' },
    ],
  },
  {
    title: 'Fokus Kegiatan',
    links: [
      { label: 'Riset Keamanan Siber' },
      { label: 'CTF & Kompetisi' },
      { label: 'Study Group' },
      { label: 'Forensik Digital' },
    ],
  },
];

const SOCIALS = [
  { Icon: Mail, href: 'mailto:forestylab@gmail.com', label: 'Email' },
  { Icon: IgIcon, href: 'https://www.instagram.com/foresty.laboratory/', label: 'Instagram' },
  { Icon: LiIcon, href: 'https://www.linkedin.com/company/foresty/', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-[#06060E] border-t border-white/[.05] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-red-600/6 blur-[100px] rounded-full" />
      </div>


      {/* Main Footer Grid */}
      <div className="relative max-w-6xl mx-auto px-5 md:px-10 py-14 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Column */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600/25 blur-xl rounded-full scale-150 pointer-events-none" />
              <img src={logoImg} alt="Foresty" className="relative h-9 w-auto" />
            </div>
            <div>
              <div className="text-white font-bold text-sm tracking-[0.2em] uppercase font-display">FORESTY LAB</div>
              <div className="text-[9px] font-mono-lab tracking-[0.22em] text-red-400/65 uppercase mt-0.5">Research Laboratory</div>
            </div>
          </div>

          <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-6">
            Laboratorium riset dan kompetisi keamanan siber dari{' '}
            <span className="text-zinc-400 font-medium">Fakultas Informatika Telkom University</span>.
            Berfokus pada <span className="text-zinc-400">riset ilmiah</span>, <span className="text-zinc-400">mentoring mahasiswa</span>,
            dan <span className="text-zinc-400">kompetisi siber</span> di tingkat nasional.
          </p>

          {/* Contact info */}
          <div className="space-y-2.5 mb-6">
            <div className="flex items-center gap-2.5 text-[12px] text-zinc-600">
              <MapPin size={12} className="text-red-700 shrink-0" />
              <span>Bandung, Jawa Barat, Indonesia</span>
            </div>
            <div className="flex items-center gap-2.5 text-[12px] text-zinc-600">
              <Mail size={12} className="text-red-700 shrink-0" />
              <span>forestylab@gmail.com</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/[.07] text-zinc-500 hover:text-white hover:border-red-500/40 hover:bg-red-500/8 transition-all group"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Nav Columns */}
        {NAV_COLS.map(col => (
          <div key={col.title}>
            <h4 className="text-[9px] font-mono-lab tracking-[0.26em] uppercase text-red-600 mb-5">
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.links.map(l => (
                <li key={l.label}>
                  {l.to ? (
                    <Link to={l.to}
                      className="text-zinc-500 hover:text-white text-[13px] transition-colors flex items-center gap-2.5 group"
                    >
                      <span className="w-4 h-px bg-zinc-800 group-hover:bg-red-600 group-hover:w-6 transition-all duration-300 shrink-0" />
                      {l.label}
                    </Link>
                  ) : (
                    <span className="text-zinc-600 text-[13px] flex items-center gap-2.5">
                      <span className="w-4 h-px bg-zinc-800 shrink-0" />
                      {l.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[.04] relative">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-[11px] font-mono-lab text-zinc-700">
            © {new Date().getFullYear()} Foresty Lab · Telkom University · Bandung
          </span>
          <div className="flex items-center gap-5">
            {['Cybersecurity', 'Digital Forensics', 'AI Research'].map(t => (
              <span key={t} className="text-[10px] font-mono-lab text-zinc-700 hover:text-zinc-500 transition-colors cursor-default">{t}</span>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
