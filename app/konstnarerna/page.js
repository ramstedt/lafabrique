import Navbar from '@/components/Navbar/Navbar';
import { fetchData } from '@/utils/fetchArtistsPage';
import Footer from '@/components/Footer/Footer';
import ArtistCard from '@/components/ArtistCard/ArtistCard';

export default async function Konstnarerna() {
  const { data } = await fetchData();

  return (
    <>
      <main>
        {data.artists.map((artist, key) => {
          return <ArtistCard artist={artist} key={key} direction={key} />;
        })}
      </main>
    </>
  );
}
