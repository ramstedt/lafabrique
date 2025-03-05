import { fetchRentals } from '@/utils/fetchRentals';
import { client } from '@/sanity/sanity';
import { PortableText } from '@portabletext/react';
import RentalCard from '@/components/RentalCard/RentalCard';
import styles from './hyra.module.css';
import Form from '@/components/Form/Form';

export default async function Hyra() {
  const { data } = await fetchRentals();

  return (
    <>
      <main>
        <div>
          OBS DENNA SIDA ÄR INTE KLAR ÄN. :)
          <PortableText value={data.rent.description} />
        </div>
        <div className={styles.rentalsWrapper}>
          {data.rent.rentCards.map((rental, key) => {
            return <RentalCard key={key} rental={rental} />;
          })}
        </div>
        <Form rentals={data.rent.rentCards} />
      </main>
    </>
  );
}
