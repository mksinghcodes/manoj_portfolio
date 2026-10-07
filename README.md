# manoj_portfolio

Modern, high-performance IT Portfolio Website with an integrated, password-protected Admin Dashboard.

## Tech Stack
- **Framework**: Next.js 15 (App Router, Server Components, TypeScript)
- **Styling**: Tailwind CSS, Lucide React Icons, Shadcn UI
- **Animations**: Framer Motion
- **Database & Auth**: Supabase (PostgreSQL, Supabase Auth, Row Level Security)
- **Deployment**: Vercel

## Structure
- `app/(public)`: Landing page, certifications matrix, seminar video player, infinite marquee photo gallery.
- `app/(admin)`: Protected admin dashboard with certificate manager, video manager, and drag-and-drop gallery uploader.
- `app/(auth)/login`: Supabase email/password authentication screen.
- `supabase/migrations`: PostgreSQL database schema with RLS policies and storage bucket configuration.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and add your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
