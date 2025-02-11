import Navbar from '@/components/Navbar/Navbar';
import styles from './page.module.css';
import Hero from '@/components/Hero/Hero';
import { fetchData } from '@/utils/fetchLandingPage';
import Image from 'next/image';
import { Dawning_of_a_New_Day } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/sanity';
import InfoCard from '@/components/InfoCard/InfoCard';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

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
          Välkommen att bli en del av vårt konstnärliga kollektiv, <br />
          en ateljé i hjärtat av{' '}
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
        </p>
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
        <div className={styles.infoCardsWrapper}>
          {data.infoCards.map((infoCard, key) => {
            return (
              <div key={key}>
                <InfoCard
                  title={infoCard.title}
                  content={infoCard.description}
                  image={infoCard.image ? urlFor(infoCard.image.asset) : ''}
                  alt={infoCard.alt || 'Image'}
                />
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
