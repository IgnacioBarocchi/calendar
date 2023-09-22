import { CalendarEventRecord } from '../components/CalendarEvent/CalendarEvent';
import formatDateToDateInputValue from '../lib/formatDateToDateInputValue';

const BASE_URL = 'http://localhost:3000/events';

export const findEvents = async (query = '') => {
  try {
    const response = await fetch(new URL(query, BASE_URL));

    if (response.ok) return await response.json();

    throw new Error('Error fetching events');
  } catch (error) {
    console.error('Error:', error);
    console.table({ error });

    throw error;
  }
};

export const saveEvent = async (event: CalendarEventRecord) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    // check if response was succesful
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    console.table({ error });

    throw error;
  }
};

export const findEvetnsByStartingDate = async (startingDate: Date) => {
  const x = formatDateToDateInputValue(startingDate).split('T')[0];
  return await findEvents(`/events?startDateTime_like=^${x}`);
};

export const getEventsOfThisWeek = (week: Date[]) => {
  week
    .map(async (d) => {
      findEvetnsByStartingDate(d);
    })
    .flat();
};
