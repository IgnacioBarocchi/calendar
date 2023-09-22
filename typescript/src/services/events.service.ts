import { CalendarEventRecord } from '../components/CalendarEvent/CalendarEvent';
import { EVENTS_BASE_URL } from '../constants/index';
import formatDateToDateInputValue from '../lib/formatDateToDateInputValue';

export const findEvents = async (query = '') => {
  try {
    const response = await fetch(new URL(query, EVENTS_BASE_URL));

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
    const response = await fetch(EVENTS_BASE_URL, {
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

export const findEvetnsByStartingDate = async (startDate: Date) => {
  const startDateString = formatDateToDateInputValue(startDate).split('T')[0];
  return await findEvents(`/events?startDateTime_like=^${startDateString}`);
};

export const getEventsOfThisWeek = async (week: Date[]) => {
  const eventsPromises = week.map(async (d) => {
    return findEvetnsByStartingDate(d);
  });

  const events = await Promise.all(eventsPromises);

  const result = events.flat();
  return result;
};
