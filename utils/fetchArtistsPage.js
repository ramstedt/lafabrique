import { client } from '@/sanity/sanity';

export const fetchData = async () => {
  try {
    const query = `{
      "artists": *[_type == "artist"] | order(_createdAt asc),
      "footer": *[_type == "footer"] | order(_createdAt asc)[0]
    }`;

    const data = await client.fetch(query);

    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};
