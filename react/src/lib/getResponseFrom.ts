const getParsedResponseFrom = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  try {
    const response = await fetch(url, options);

    if (response.ok) return await response.json();

    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.table({ error });
    throw error;
  }
};

export default getParsedResponseFrom;
