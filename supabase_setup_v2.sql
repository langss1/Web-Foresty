-- SQL Script to set up Foresty Database (V2 - Complete Schema)
-- Run this in Supabase SQL Editor

-- 1. Table for Projects & Research
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    title TEXT NOT NULL,
    description TEXT,
    contributors TEXT, -- List of aslab/members
    repo_link TEXT, -- Link to GitHub/Research
    user_id UUID REFERENCES auth.users(id)
);

-- 2. Table for Student Achievements (Prestasi)
CREATE TABLE IF NOT EXISTS public.prestasi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    title_achievement TEXT NOT NULL, -- e.g. "Juara 1"
    competition_name TEXT NOT NULL, -- e.g. "CTF Nasional"
    category TEXT, -- National/Regional/International
    members TEXT, -- Team members
    photo_url TEXT, -- Link to photo
    user_id UUID REFERENCES auth.users(id)
);

-- 3. Table for Awards (Penghargaan)
CREATE TABLE IF NOT EXISTS public.awards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    title TEXT NOT NULL,
    institution TEXT, -- Giver of the award
    contributors TEXT, -- Who received it
    user_id UUID REFERENCES auth.users(id)
);

-- 4. Table for Articles (Blog/News) - REMOVED (Not used)
-- 5. Table for Operatives (Struktural/Members) - REMOVED (Hardcoded in Frontend)

-- 6. Table for Admin Activity Logs
CREATE TABLE IF NOT EXISTS public.admin_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    user_id UUID REFERENCES auth.users(id),
    user_email TEXT,
    action TEXT NOT NULL, 
    details JSONB -- Will store title, device, ip_approx, etc.
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prestasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- Clean up existing policies to avoid duplicates
DROP POLICY IF EXISTS "Public Read Projects" ON public.projects;
DROP POLICY IF EXISTS "Public Read Prestasi" ON public.prestasi;
DROP POLICY IF EXISTS "Public Read Awards" ON public.awards;

DROP POLICY IF EXISTS "Admin All Projects" ON public.projects;
DROP POLICY IF EXISTS "Admin All Prestasi" ON public.prestasi;
DROP POLICY IF EXISTS "Admin All Awards" ON public.awards;
DROP POLICY IF EXISTS "Admin Read Logs" ON public.admin_logs;
DROP POLICY IF EXISTS "Admin Insert Logs" ON public.admin_logs;

-- Policies: Public Read Access
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Prestasi" ON public.prestasi FOR SELECT USING (true);
CREATE POLICY "Public Read Awards" ON public.awards FOR SELECT USING (true);

-- Policies: Admin Full Access (Authenticated users)
CREATE POLICY "Admin All Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Prestasi" ON public.prestasi FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Awards" ON public.awards FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Read Logs" ON public.admin_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Insert Logs" ON public.admin_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
