-- =============================================================================
-- Migration: Portfolio Database Schema & Row Level Security (RLS)
-- Project: mksingh_portfolio
-- Platform: Supabase / PostgreSQL 15+
-- =============================================================================

-- 1. EXTENSIONS & UTILITIES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE public.certificate_status AS ENUM ('completed', 'in_progress');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.certificate_category AS ENUM (
        'AI',
        'Cybersecurity',
        'IT Support',
        'Data',
        'Marketing'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. TABLES DEFINITION
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL CHECK (char_length(trim(title)) > 0),
    issuer TEXT NOT NULL CHECK (char_length(trim(issuer)) > 0),
    status public.certificate_status NOT NULL DEFAULT 'completed',
    issue_date DATE,
    credential_url TEXT CHECK (credential_url IS NULL OR credential_url ~* '^https?://'),
    image_url TEXT NOT NULL CHECK (image_url ~* '^https?://'),
    category public.certificate_category NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.certificates
    DROP CONSTRAINT IF EXISTS check_completed_issue_date;
ALTER TABLE public.certificates
    ADD CONSTRAINT check_completed_issue_date
    CHECK (
        (status = 'completed') OR
        (status = 'in_progress' AND issue_date IS NULL)
    );

CREATE TABLE IF NOT EXISTS public.videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL CHECK (char_length(trim(title)) > 0),
    event_name TEXT NOT NULL CHECK (char_length(trim(event_name)) > 0),
    youtube_url_or_id TEXT NOT NULL CHECK (char_length(trim(youtube_url_or_id)) > 0),
    date DATE NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.gallery_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL CHECK (char_length(trim(title)) > 0),
    event_name TEXT NOT NULL CHECK (char_length(trim(event_name)) > 0),
    image_url TEXT NOT NULL CHECK (image_url ~* '^https?://'),
    date DATE NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. TRIGGERS
DROP TRIGGER IF EXISTS set_certificates_updated_at ON public.certificates;
CREATE TRIGGER set_certificates_updated_at
    BEFORE UPDATE ON public.certificates
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_videos_updated_at ON public.videos;
CREATE TRIGGER set_videos_updated_at
    BEFORE UPDATE ON public.videos
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_gallery_photos_updated_at ON public.gallery_photos;
CREATE TRIGGER set_gallery_photos_updated_at
    BEFORE UPDATE ON public.gallery_photos
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 5. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_certificates_category_order
    ON public.certificates(category, display_order ASC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_videos_date
    ON public.videos(date DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_gallery_order_date
    ON public.gallery_photos(display_order ASC, date DESC);

-- 6. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Certificates Policies
DROP POLICY IF EXISTS "Public can view certificates" ON public.certificates;
CREATE POLICY "Public can view certificates"
    ON public.certificates FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated admins can insert certificates" ON public.certificates;
CREATE POLICY "Authenticated admins can insert certificates"
    ON public.certificates FOR INSERT TO authenticated WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated admins can update certificates" ON public.certificates;
CREATE POLICY "Authenticated admins can update certificates"
    ON public.certificates FOR UPDATE TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated admins can delete certificates" ON public.certificates;
CREATE POLICY "Authenticated admins can delete certificates"
    ON public.certificates FOR DELETE TO authenticated USING (auth.role() = 'authenticated');

-- Videos Policies
DROP POLICY IF EXISTS "Public can view videos" ON public.videos;
CREATE POLICY "Public can view videos"
    ON public.videos FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated admins can insert videos" ON public.videos;
CREATE POLICY "Authenticated admins can insert videos"
    ON public.videos FOR INSERT TO authenticated WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated admins can update videos" ON public.videos;
CREATE POLICY "Authenticated admins can update videos"
    ON public.videos FOR UPDATE TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated admins can delete videos" ON public.videos;
CREATE POLICY "Authenticated admins can delete videos"
    ON public.videos FOR DELETE TO authenticated USING (auth.role() = 'authenticated');

-- Gallery Photos Policies
DROP POLICY IF EXISTS "Public can view gallery photos" ON public.gallery_photos;
CREATE POLICY "Public can view gallery photos"
    ON public.gallery_photos FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated admins can insert gallery photos" ON public.gallery_photos;
CREATE POLICY "Authenticated admins can insert gallery photos"
    ON public.gallery_photos FOR INSERT TO authenticated WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated admins can update gallery photos" ON public.gallery_photos;
CREATE POLICY "Authenticated admins can update gallery photos"
    ON public.gallery_photos FOR UPDATE TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated admins can delete gallery photos" ON public.gallery_photos;
CREATE POLICY "Authenticated admins can delete gallery photos"
    ON public.gallery_photos FOR DELETE TO authenticated USING (auth.role() = 'authenticated');

-- 7. STORAGE BUCKET & RLS
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'portfolio-media',
    'portfolio-media',
    true,
    10485760,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

DROP POLICY IF EXISTS "Public can view media" ON storage.objects;
CREATE POLICY "Public can view media"
    ON storage.objects FOR SELECT TO anon, authenticated
    USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Admin upload media" ON storage.objects;
CREATE POLICY "Admin upload media"
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin update media" ON storage.objects;
CREATE POLICY "Admin update media"
    ON storage.objects FOR UPDATE TO authenticated
    USING (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin delete media" ON storage.objects;
CREATE POLICY "Admin delete media"
    ON storage.objects FOR DELETE TO authenticated
    USING (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');
