import Navbar from '@/components/Navbar/Navbar';
import styles from './page.module.css';
import Hero from '@/components/Hero/Hero';
import { fetchData } from '@/utils/fetchLandingPage';

export default async function Home() {
  const { data } = await fetchData();

  return (
    <>
      <Navbar />
      <Hero gallery={data.gallery} />
      <main className={styles.main}>
        hej
        <br />
        hej
        <br />
        hej
        <br />
        hej
        <br />
        hej
        <br />
        hej
        <br />
        hej
        <br />
        hej
        <br />
        hej
        <br />
        hej
        <br />
        hej
        <br />
        hej
        <br />
        hej
        <br />
        hej
        <br />
        hej
        <br />
        hej
        <br />
      </main>
    </>
  );
}
