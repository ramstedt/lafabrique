import { client } from '@/sanity/sanity';

export const fetchData = async () => {
  try {
    const landingPageQuery = `*[_type == "landingPage"] | order(_createdAt asc)[0]`;
    const data = await client.fetch(landingPageQuery);

    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};
