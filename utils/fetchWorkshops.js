import { client } from '@/sanity/sanity';

export const fetchWorkshops = async () => {
  try {
    const query = `{
      "workshops": *[_type == "workshop"] | order(_createdAt asc)
    }`;

    const fetch = await client.fetch(query);
    const data = fetch;
    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};
