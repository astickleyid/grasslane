import type { Metadata, Viewport } from 'next';
import './globals.css';

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
