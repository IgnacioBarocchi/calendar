export default async (query = '') => {
  try {
    const response = await fetch(
      new URL(query, 'http://localhost:3000/events'),
    );

    if (response.ok) return await response.json();

    throw new Error('Error fetching events');
  } catch (error) {
    console.error('Error:', error);
    console.table({ error });

    throw error;
  }
};
