import type { Metadata, Viewport } from 'next';
import { Anton, Inter, Fraunces } from 'next/font/google';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
  style: ['italic', 'normal']
});

export const metadata: Metadata = {
  title: 'Grass Lane Lawn Co. — Premium Lawn Care in Toledo, Ohio',
  description:
    'Different lanes. Better lawns. Premium lawn care in Toledo, Ohio built on precision, reliability, and results you can see. Mowing, fertilization, weed control, aeration, and landscape services.',
  keywords: [
    'lawn care toledo ohio',
    'toledo lawn service',
    'lawn mowing toledo',
    'fertilization',
    'weed control',
    'aeration',
    'landscaping toledo',
    'grass lane lawn co'
  ],
  authors: [{ name: 'Grass Lane Lawn Co.' }],
  openGraph: {
    title: 'Grass Lane Lawn Co. — Live Life in the Grass Lane',
    description:
      'Premium lawn care in Toledo, Ohio built on precision, reliability, and results you can see.',
    url: 'https://grasslanelawnco.com',
    siteName: 'Grass Lane Lawn Co.',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grass Lane Lawn Co. — Live Life in the Grass Lane',
    description: 'Premium lawn care in Toledo, Ohio.'
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://grasslanelawnco.com')
};

export const viewport: Viewport = {
  themeColor: '#0A0E08',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
