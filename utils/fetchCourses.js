import { client } from '@/sanity/sanity';

export const fetchData = async () => {
  try {
    const query = `{
      "courses": *[_type == "course"] | order(_createdAt asc)
    }`;

    const data = await client.fetch(query);
    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};
