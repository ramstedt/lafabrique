import Navbar from '@/components/Navbar/Navbar';
import styles from './page.module.css';
import Hero from '@/components/Hero/Hero';
import { fetchData } from '@/utils/fetchLandingPage';
import Image from 'next/image';
import { Dawning_of_a_New_Day } from 'next/font/google';
import Footer from '@/components/Footer/Footer';

const dawning = Dawning_of_a_New_Day({
  subsets: ['latin'],
  weight: '400',
});

export default async function Home() {
  const { data } = await fetchData();

  return (
    <>
      <Navbar />
      <Hero gallery={data.gallery} />
      <main className={styles.main}>
        <p className={styles.intro}>
          En ateljé i hjärtat av{' '}
          <span className={`${dawning.className} ${styles.dawning}`}>
            Majorna
          </span>
          . Här möts konstnärer och{' '}
          <span className={`${dawning.className} ${styles.dawning}`}>
            kreativa själar
          </span>{' '}
          för att utforska{' '}
          <span className={`${dawning.className} ${styles.dawning}`}>
            måleri och keramik
          </span>{' '}
          i en{' '}
          <span className={`${dawning.className} ${styles.dawning}`}>
            inspirerande miljö
          </span>
          . Vår ateljé är en plats där du kan skapa fritt,{' '}
          <span className={`${dawning.className} ${styles.dawning}`}>
            hyra arbetsyta
          </span>{' '}
          eller delta i{' '}
          <span className={`${dawning.className} ${styles.dawning}`}>
            kurser och workshops
          </span>
          , oavsett om du är nybörjare eller erfaren. Med en varm och
          gemenskaplig atmosfär erbjuder vi en{' '}
          <span className={`${dawning.className} ${styles.dawning}`}>
            kreativ fristad
          </span>{' '}
          där idéer får liv och händerna får arbeta. <br />
          <br />{' '}
          <span className={`${styles.welcome}`}>
            Välkommen att bli en del av vårt konstnärliga kollektiv!
          </span>
        </p>
        <br />
        <div className={styles.imageWrapper}>
          <Image
            src='/assets/camomile11-min.svg'
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
      <Footer />
    </>
  );
}
