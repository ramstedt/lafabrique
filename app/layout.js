import { Manrope } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer/Footer';
import { fetchData } from '@/utils/fetchFooter';
import Navbar from '@/components/Navbar/Navbar';

const manrope = Manrope({
  subsets: ['latin'],
});

export const metadata = {
  title: 'La Fabrique',
  description: 'lorem',
};

export default async function RootLayout({ children }) {
  const { data } = await fetchData();
  return (
    <html lang="se">
      <body className={manrope.className}>
        <Navbar />
        {children} <Footer data={data.footer} />
      </body>
    </html>
  );
}
