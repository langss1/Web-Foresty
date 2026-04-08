# 🛡️ FORESTY - Cybersecurity & Forensics Research Group

Welcome to the official web repository for **Foresty**, a specialized research group from Telkom University focusing on Cybersecurity and Digital Forensics.

## 🚀 Status Proyek - PENTING (BACA INI DULU)
*   **ADMIN PORTAL (`/src/pages/admin`):** SUDAH SELESAI (Final). Desain menggunakan tema *Dark/Corporate Premium* dengan aksen merah. Jangan mengubah logika di sini tanpa koordinasi.
*   **PUBLIC PAGES (`/src/pages/public`):** WIREFRAME ONLY. Seluruh desain visual telah dihapus untuk memberikan kebebasan kepada Designer untuk merancang ulang estetika dari nol. Struktur layout dan fungsionalitas sudah siap.

---

## 📂 Project Structure
```text
foresty-web/
├── src/
│   ├── assets/          # Simpan semua gambar, logo (.png, .svg) di sini
│   ├── components/      
│   │   └── layout/      # Navbar.jsx (Butuh desain ulang visual)
│   ├── lib/             # supabase.js (Koneksi Database - JANGAN DIUBAH)
│   ├── pages/           
│   │   ├── admin/       # Dashboard & Login (Final Design - Professional Dark)
│   │   └── public/      # LandingPage, TeamPage, DisplayList (Wireframe Only)
│   ├── App.jsx          # Routing (React Router)
│   └── main.jsx         # Entry Point & Global CSS
```

## 🎨 Panduan Desain & Prompting (Untuk UI Designer)
Halaman publik saat ini sengaja dibuat dalam bentuk **wireframe hitam-putih** agar Anda bisa fokus pada desain visual.

### Rekomendasi Prompting / Arahan Desain:
1.  **Halaman Publik (`LandingPage`, `TeamPage`, `DisplayList`):**
    *   **Layout:** Pertahankan posisi data (Data fetching sudah jalan). Fokus pada penambahan warna, tipografi, spacing, dan efek dekoratif.
    *   **Aksen:** Gunakan warna Merah sebagai warna sekunder (sesuai logo Foresty).
    *   **Komponen:** Gunakan Tailwind CSS. Komponen sudah responsif secara dasar, silakan ditingkatkan estetika visualnya (card shadows, rounded corners, hover effects).
2.  **Navbar:** 
    *   Sederhanakan navigasi. Gunakan logo yang ada di `/assets/logo.png`.
    *   **Keamanan:** Jangan tambahkan link login di Navbar publik. Login dilakukan secara internal via URL `/admin/login`.

## 🛠️ Tech Stack & Dependencies
- **Styling:** Tailwind CSS (Utama)
- **Animations:** Framer Motion (Sudah terpasang, silakan tambahkan animasi transisi)
- **Icons:** Lucide React (Gunakan ikon yang relevan untuk setiap seksi)
- **Backend:** Supabase (Jangan ubah file di `/src/lib` agar integrasi data tidak rusak)

---

## 🛠️ Development Setup
1.  `npm install`
2.  Setup `.env` dengan kredensial Supabase (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY).
3.  `npm run dev`

---
Built with ❤️ by **Foresty Development Team**
