import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'edunex — All-in-One Study Abroad Planning Platform',
  description:
    'Comprehensive study abroad planning platform for Germany and international destinations. Complete official information, universities, admission requirements, APS certification guides, student visa roadmaps, blocked accounts, scholarships, living costs, accommodation, part-time jobs, and health insurance.',
  keywords: [
    'Study in Germany',
    'Germany Universities',
    'APS Certificate India',
    'German Student Visa',
    'Blocked Account Sperrkonto',
    'DAAD Scholarships',
    'Study Abroad Platform',
  ],
  authors: [{ name: 'edunex Team' }],
  openGraph: {
    title: 'edunex — All-in-One Study Abroad Planning Platform',
    description: 'Master every stage of your study abroad journey. Tuition-free Germany guide, APS, Visa, Blocked Account, & Universities database.',
    url: 'https://edunex.io',
    siteName: 'edunex',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'edunex — All-in-One Study Abroad Planning Platform',
    description: 'Master every stage of your study abroad journey with edunex.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className="bg-white text-zinc-900 min-h-screen">
        <ReactQueryProvider>
          <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
