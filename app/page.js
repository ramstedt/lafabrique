import Navbar from '@/components/Navbar/Navbar';
import styles from './page.module.css';
import Hero from '@/components/Hero/Hero';
import { fetchData } from '@/utils/fetchLandingPage';
import Image from 'next/image';

export default async function Home() {
  const { data } = await fetchData();

  return (
    <>
      <Navbar />
      <Hero gallery={data.gallery} />
      <main className={styles.main}>
        hej
        <br />
        <div className={styles.imageWrapper}>
          <Image
            src='/assets/camomile11.svg'
            width={500}
            height={500}
            alt='Camomile flower sketch'
            className={styles.bg}
            priority
          />
        </div>
        <div className={styles.container}>
          <div className={styles.border}>
            <div className={styles.spaceAround}>
              <p>I am an element with a hand-drawn border!</p>
              <p>No animation applied.</p>
            </div>
          </div>
        </div>
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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quo
          natus at ad rem fuga. Dolor, tempora labore! Aut dolores temporibus
          natus harum pariatur beatae optio rerum dolorem hic unde quasi
          consequatur at quisquam, cumque, culpa vitae est possimus itaque qui
          consequuntur dolorum explicabo! Repudiandae est provident voluptas qui
          iste.
        </p>
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
