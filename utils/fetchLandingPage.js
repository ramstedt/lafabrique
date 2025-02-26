import { client } from '@/sanity/sanity';

export const fetchData = async () => {
  try {
    const query = `{
      "landingPage": *[_type == "landingPage"] | order(_createdAt asc)[0],
    }`;

    const data = await client.fetch(query);

    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};
