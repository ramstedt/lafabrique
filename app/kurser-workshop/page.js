import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import { fetchData } from '@/utils/fetchLandingPage';
import Image from 'next/image';
import Footer from '@/components/Footer/Footer';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/sanity';
import InfoCard from '@/components/InfoCard/InfoCard';
import ContentBlock from '@/components/ContentBlock/ContentBlock';
import ArtistCard from '@/components/ArtistCard/ArtistCard';

export default async function courses() {
  const { data } = await fetchData();
  return (
    <>
      <Navbar />
      <main>Kommer snart</main>
      <Footer data={data.footer} />
    </>
  );
}
