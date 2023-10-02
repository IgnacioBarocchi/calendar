const getResponseFrom = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) return await response.json();

    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.table({ error });
    throw error;
  }
};

export default getResponseFrom;
