import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Manoj Kumar Singh | Cloud & Systems Architect',
  description: 'Enterprise Cloud Infrastructure, Zero-Trust Cybersecurity, and Applied AI Engineering Portfolio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
