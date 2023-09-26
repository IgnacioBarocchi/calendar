import { CalendarEvent } from '../store/@types';
import { EVENTS_BASE_URL } from '../constants/endpoints';
import { Week } from '../lib/weekHelper';

export const getWeekEvents = async (week: Week): Promise<CalendarEvent[]> => {
  const referenceSundayValue = new Date(week[0]).setHours(0, 0, 0).valueOf();

  const referenceSaturdayValue = new Date(week[6]).setHours(0, 0, 0).valueOf();

  const queryString = `?value_gte=${referenceSundayValue}&value_lte=${referenceSaturdayValue}`;

  try {
    const response = await fetch(new URL(EVENTS_BASE_URL, queryString));
    console.log(response.json());

    // check if response was succesful
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    console.table({ error });

    throw error;
  }
};

export const saveEvent = async (
  event: CalendarEvent,
): Promise<CalendarEvent> => {
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

export const postEvent = async (
  event: CalendarEvent,
): Promise<CalendarEvent> => {
  try {
    const response = await fetch(EVENTS_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Error posting event');
    }
  } catch (error) {
    console.error('Error:', error);
    console.table({ error });

    throw error;
  }
};

export const deleteEventById = async (eventId: string): Promise<null> => {
  try {
    const response = await fetch(`${EVENTS_BASE_URL}/${eventId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return null;
    } else {
      throw new Error('Error deleting event');
    }
  } catch (error) {
    console.error('Error:', error);
    console.table({ error });

    throw error;
  }
};
