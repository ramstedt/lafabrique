import { fetchArtists } from '@/utils/fetchArtistsPage';
import ArtistCard from '@/components/ArtistCard/ArtistCard';

export default async function Konstnarerna() {
  const { data } = await fetchArtists();

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
