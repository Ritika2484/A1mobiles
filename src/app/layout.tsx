import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://a1mobileshop.in'),
  title: 'A1 Mobile Shop | Buy Smartphones & Sell Your Old Phone',
  description: 'Buy the latest smartphones and accessories or sell your old phone for the best value at A1 Mobile Shop.',
  keywords: 'A1 Mobile Shop, Buy smartphone, Sell old phone, Gorakhpur mobile store, iPhone 17 Pro Max, Samsung S26 Ultra, OnePlus 13, Basharatpur mobile shop, cash for old phone, trade in mobile',
  openGraph: {
    title: 'A1 Mobile Shop | Buy Smartphones & Sell Your Old Phone',
    description: 'Buy the latest smartphones and accessories or sell your old phone for the best value at A1 Mobile Shop in Gorakhpur.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'A1 Mobile Shop',
    images: [
      {
        url: '/images/hero-phone.jpg',
        width: 1200,
        height: 630,
        alt: 'A1 Mobile Shop - Buy New, Sell Old, Upgrade Smart',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
        <AppProviders>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
