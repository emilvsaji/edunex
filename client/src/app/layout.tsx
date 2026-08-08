import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://edunex-production.vercel.app'),
  title: 'edunex — All-in-One Study Abroad Planning Platform',
  description:
    'Comprehensive study abroad planning platform for Germany, Austria, and international destinations. Complete official information, universities, admission requirements, APS certification guides, student visa roadmaps, blocked accounts, scholarships, living costs, accommodation, part-time jobs, and health insurance.',
  keywords: [
    'Study in Germany',
    'Study in Austria',
    'Germany Universities',
    'Austria Universities',
    'APS Certificate India',
    'German Student Visa',
    'Austrian Student Visa',
    'Blocked Account Sperrkonto',
    'DAAD Scholarships',
    'OeAD Scholarships',
    'Study Abroad Platform',
  ],
  authors: [{ name: 'edunex Team' }],
  icons: {
    icon: [
      { url: '/icon.png' },
      { url: '/images/edunex_logo.png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'edunex — All-in-One Study Abroad Planning Platform',
    description: 'Master every stage of your study abroad journey. Tuition-free Germany guide, Austria guide, APS, Visa, Blocked Account, & Universities database.',
    url: 'https://edunex-production.vercel.app',
    siteName: 'edunex',
    images: [
      {
        url: '/images/edunex_logo.png',
        width: 512,
        height: 512,
        alt: 'edunex logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'edunex — All-in-One Study Abroad Planning Platform',
    description: 'Master every stage of your study abroad journey with edunex.',
    images: ['/images/edunex_logo.png'],
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
    <html lang="en" className={`light ${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-white text-zinc-900 min-h-screen font-sans antialiased overflow-x-hidden">
        <ReactQueryProvider>
          <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
