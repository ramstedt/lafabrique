import Navbar from '@/components/Navbar/Navbar';
import { fetchData } from '@/utils/fetchArtistsPage';
import Footer from '@/components/Footer/Footer';
import ArtistCard from '@/components/ArtistCard/ArtistCard';

export default async function Konstnarerna() {
  const { data } = await fetchData();

  return (
    <>
      <Navbar />
      <main>
        {data.artists.map((artist, key) => {
          return (
            <ArtistCard
              artist={artist}
              key={key}
              direction={key % 2 === 0 ? 'right' : 'left'}
            />
          );
        })}
      </main>
      <Footer data={data.footer} />
    </>
  );
}
