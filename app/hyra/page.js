import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import { fetchRentals } from '@/utils/fetchRentals';
import Image from 'next/image';
import Footer from '@/components/Footer/Footer';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/sanity';
import InfoCard from '@/components/InfoCard/InfoCard';
import ContentBlock from '@/components/ContentBlock/ContentBlock';
import ArtistCard from '@/components/ArtistCard/ArtistCard';

export default async function Hyra() {
  const { data } = await fetchRentals();
  return (
    <>
      <main>Kommer snart{console.log(data)}</main>
    </>
  );
}
