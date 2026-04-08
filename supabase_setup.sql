-- SQL Script to set up Foresty Database on Supabase (Updated with Admin Logging)

-- 1. Table for Projects & Research
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    date DATE DEFAULT CURRENT_DATE,
    user_id UUID REFERENCES auth.users(id)
);

-- 2. Table for Student Achievements (Prestasi)
CREATE TABLE IF NOT EXISTS public.prestasi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE DEFAULT CURRENT_DATE,
    user_id UUID REFERENCES auth.users(id)
);

-- 3. Table for Awards (Penghargaan)
CREATE TABLE IF NOT EXISTS public.awards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE DEFAULT CURRENT_DATE,
    user_id UUID REFERENCES auth.users(id)
);

-- 4. NEW: Table for Admin Activity Logs
CREATE TABLE IF NOT EXISTS public.admin_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    user_id UUID REFERENCES auth.users(id),
    user_email TEXT,
    action TEXT NOT NULL, -- e.g. "LOGIN", "CREATE_PROJECT", "DELETE_AWARDS"
    details JSONB -- JSON for additional data like record titles
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prestasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- 6. Policies: Public Read Access (except logs)
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Prestasi" ON public.prestasi FOR SELECT USING (true);
CREATE POLICY "Public Read Awards" ON public.awards FOR SELECT USING (true);

-- 7. Policies: Admin Access (Full CRUD)
CREATE POLICY "Admin All Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Prestasi" ON public.prestasi FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Awards" ON public.awards FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Add Logs" ON public.admin_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin Read Logs" ON public.admin_logs FOR SELECT USING (auth.role() = 'authenticated');

-- OPTIONAL: Shared MFA Logic or Admin Flag might go here if your Supabase project uses it.
