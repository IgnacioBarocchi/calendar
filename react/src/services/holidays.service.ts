import { HOLIDAYS_BASE_URL } from '../constants/endpoints';

const getHolidaysURL = (year: number, countryCode: string): URL => {
  return new URL(`/${year}/${countryCode}`, HOLIDAYS_BASE_URL);
};

export const getHolidays = async (year: number) => {
  try {
    const response = await fetch(getHolidaysURL(year, 'LT'));

    if (response.ok) return await response.json();

    throw new Error('Error fetching events');
  } catch (error) {
    console.error('Error:', error);
    console.table({ error });

    throw error;
  }
};
