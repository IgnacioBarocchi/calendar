import { CalendarEvent } from '../store/@types';
import { Week } from './weekHelper';
import { getWeekEvents } from '../services/events.service';

export const getEventsFrom = (week: Week): CalendarEvent[] => {
  async function resolveEvents() {
    return await getWeekEvents(week);
  }

  return resolveEvents();
};
