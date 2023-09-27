import { CalendarEvent } from '../store/@types';
import { EVENTS_BASE_URL } from '../constants/endpoints';
import { Week } from '../lib/weekHelper';
import getResponseFrom from '../lib/getResponseFrom';

export const getWeekEvents = async (week: Week): Promise<CalendarEvent[]> => {
  const referenceSundayValue = new Date(
    new Date(week[0]).setHours(0, 0, 0),
  ).toISOString();

  const referenceSaturdayValue = new Date(
    new Date(week[6]).setHours(0, 0, 0),
  ).toISOString();

  const queryString = `?start_gte=${referenceSundayValue}&start_lte=${referenceSaturdayValue}`;
  const url = new URL(queryString, EVENTS_BASE_URL);

  return getResponseFrom(url.toString(), {});
};

export const postEvent = async (
  event: CalendarEvent,
): Promise<CalendarEvent> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...event,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    }),
  };

  return getResponseFrom(EVENTS_BASE_URL, options);
};

export const deleteEventById = async (eventId: string): Promise<null> => {
  const options: RequestInit = {
    method: 'DELETE',
  };

  return getResponseFrom(`${EVENTS_BASE_URL}/${eventId}`, options);
};
