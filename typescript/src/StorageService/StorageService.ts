import { MONTHS, USE_JSON_SERVER, USE_WEEK_CACHING } from '../constants/index';
import { findEvents, getEventsOfThisWeek } from '../services/events.service';

import mapRange from '../lib/mapRange';

class StorageService {
  // todo: change to private
  public selectedWeek: Date[] = [];
  private static instance: StorageService | null = null;

  private constructor() {
    this.setSelectedWeek(new Date(), 0);

    if (USE_WEEK_CACHING) {
      window.addEventListener('beforeunload', () => {
        sessionStorage.clear();
      });

      sessionStorage.setItem('cachedWeeks', JSON.stringify([]));
    }
  }

  private getEvents() {
    if (USE_JSON_SERVER) {
      return findEvents();
    }

    if (!localStorage.length) {
      localStorage.setItem('events', '{}');
    }
    return JSON.parse(localStorage.getItem('events') || '{}');
  }

  public saveEvent(event: any) {
    const events = this.getEvents();
    const slotIndex = `${event.startDateTime.getDay()}-${event.startDateTime.getHours()}`;
    const eventsOfTheSlot = events[slotIndex] || [];

    event.id = String(
      Object.values(events).flat().length +
        Math.random() * 10000 +
        new Date().getSeconds(),
    ).replace('.', '');

    eventsOfTheSlot.push(event);

    localStorage.setItem(
      'events',
      JSON.stringify({ ...events, [slotIndex]: eventsOfTheSlot }),
    );
  }

  public async getEventsBySlotIndex(slotIndex: string) {
    const events = USE_JSON_SERVER
      ? await this.getEventsOfTheWeekBySlotIndex()
      : await this.getEvents();

    console.log(JSON.stringify(events));

    const eventsOfTheSlot = events[slotIndex];
    console.log(slotIndex, eventsOfTheSlot);
    if (!eventsOfTheSlot?.length) return [];

    const timeSlotDayTime = new Date(
      document.querySelector(`[data-slot-index="${slotIndex}"]`)?.dataset
        .dateTime || '',
    );

    return eventsOfTheSlot.filter((event: any) => {
      const eventDate = new Date(event.startDateTime);
      return (
        eventDate.getHours() === timeSlotDayTime.getHours() &&
        eventDate.getDate() === timeSlotDayTime.getDate()
      );
    });
  }

  public deleteEventById(targetId: string) {
    localStorage.setItem(
      'events',
      JSON.stringify(
        Object.fromEntries(
          Object.entries(this.getEvents()).map(
            ([key, itsEvents]: [string, any[]]) => {
              return [key, itsEvents.filter((event) => event.id !== targetId)];
            },
          ),
        ),
      ),
    );
  }

  public getMonthOfYear() {
    const referenceSunday = this.selectedWeek[0];
    return `${
      MONTHS[referenceSunday.getMonth()]
    } ${referenceSunday.getFullYear()}`;
  }

  private cachWeek(week: Date[], index: number) {
    const cachedWeeks = JSON.parse(
      sessionStorage.getItem('cachedWeeks') || '[]',
    );
    cachedWeeks[index] = week;
    sessionStorage.setItem('cachedWeeks', JSON.stringify(cachedWeeks, null, 2));
  }

  public setSelectedWeek(date: Date, index: number) {
    if (USE_WEEK_CACHING) {
      const cachedWeeks = JSON.parse(
        sessionStorage.getItem('cachedWeeks') || '[]',
      ).map((dateTimeString: string) => new Date(dateTimeString));

      if (cachedWeeks && cachedWeeks[index]?.length) {
        const cachedWeek = cachedWeeks[index];
        this.selectedWeek = cachedWeek;
        return this.selectedWeek;
      }
    }

    const startDate = new Date(date.setDate(date.getDate() - date.getDay()));

    const week = mapRange(0, 7, (dayNumber: number) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + dayNumber);
      return currentDate;
    });

    if (week && week.length > 0) {
      if (USE_WEEK_CACHING) {
        this.cachWeek(week, index);
      }
      this.selectedWeek = week;
    } else {
      throw new Error('Week error');
    }
  }

  public getSelectedWeek() {
    return this.selectedWeek;
  }

  public static getInstance() {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  private async getEventsOfTheWeekBySlotIndex() {
    return (await getEventsOfThisWeek(this.selectedWeek)).reduce(
      (acc, eventRecord) => {
        const { startDateTime: startDateTimeString } = eventRecord;

        const startDateTime = new Date(startDateTimeString);
        const day = startDateTime.getDay();
        const hour = startDateTime.getHours();
        const events = acc[`${day}-${hour}`] || [];
        events.push(startDateTime);

        acc[`${day}-${hour}`] = events;

        return acc;
      },
      {},
    );
  }
}

export default StorageService.getInstance();
