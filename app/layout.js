import { Manrope } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer/Footer';
import { fetchFooter } from '@/utils/fetchFooter';
import Navbar from '@/components/Navbar/Navbar';
import Image from 'next/image';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const manrope = Manrope({
  subsets: ['latin'],
});

export const metadata = {
  title: 'La Fabrique',
  description:
    'Skapa fritt, hyr arbetsyta eller delta i kurser och workshops, oavsett erfarenhetsnivå. Vi är ett konstnärligt kollektiv i Majorna - en inspirerande ateljé för måleri keramik, och mer. Välkommen till en kreativ gemenskap!',
};

export default async function RootLayout({ children }) {
  const { data } = await fetchFooter();
  return (
    <html lang="sv">
      <body className={manrope.className}>
        <Navbar />
        <div className="bgImageWrapper">
          <Image
            src="/assets/camomile11-min.svg"
            width={500}
            height={500}
            alt="Camomile flower sketch"
            className="bgImage"
            priority
          />
        </div>
        {children} <Footer data={data.footer} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
