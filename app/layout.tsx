import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ThemeRegistry from '@/components/theme/ThemeRegistry';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'CreaseGrid — Global Cricket Intelligence & Local Network',
  description:
    'Accurate cricket calculators, deterministic tournament qualification, editorial analysis, and local tournament operations from Pakistan.',
  icons: {
    icon: '/assets/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0f1d38" />
      </head>
      <body className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans antialiased selection:bg-brand-600 selection:text-white">
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
