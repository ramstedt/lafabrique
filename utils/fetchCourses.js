import { client } from '@/sanity/sanity';

export const fetchCourses = async () => {
  try {
    const query = `{
      "courses": *[_type == "course"] | order(_createdAt asc)
    }`;

    const fetch = await client.fetch(query);
    const data = fetch.courses;
    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};
