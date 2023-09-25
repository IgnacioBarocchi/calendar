import { MONTHS, USE_JSON_SERVER, USE_WEEK_CACHING } from '../constants/index';
import {
  deleteEventById,
  findEvents,
  getEventsOfThisWeek,
  postEvent,
} from '../services/events.service';

import { CalendarEventRecord } from '../components/CalendarEvent/CalendarEvent';
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

  private getEvents(): CalendarEventRecord[] | Promise<CalendarEventRecord[]> {
    if (USE_JSON_SERVER) {
      // @ts-ignore
      return findEvents();
    }

    if (!localStorage.length) {
      localStorage.setItem('events', '{}');
    }

    return JSON.parse(localStorage.getItem('events') || '{}');
  }

  public saveEvent(event: CalendarEventRecord): void {
    const events = this.getEvents();
    const slotIndex = `${event.startDateTime.getDay()}-${event.startDateTime.getHours()}`;
    //  @ts-ignore
    const eventsOfTheSlot: CalendarEventRecord[] = events[slotIndex] || [];

    event.id = String(
      Object.values(events).flat().length +
        Math.random() * 10000 +
        new Date().getSeconds(),
    ).replace('.', '');

    eventsOfTheSlot.push(event);

    if (USE_JSON_SERVER) {
      postEvent(event);
    } else {
      localStorage.setItem(
        'events',
        JSON.stringify({ ...events, [slotIndex]: eventsOfTheSlot }),
      );
    }
  }

  public async getEventsBySlotIndex(
    slotIndex: string,
  ): Promise<CalendarEventRecord[]> {
    const events = USE_JSON_SERVER
      ? await this.getEventsOfTheWeekBySlotIndex()
      : await this.getEvents();

    // @ts-ignore
    const eventsOfTheSlot = events[slotIndex] || [];

    if (!eventsOfTheSlot?.length) return [];
    // ! estamos seguros de que llega aca
    const timeSlotDayTime = new Date(
      // @ts-ignore
      document.querySelector(`[data-slot-index="${slotIndex}"]`)?.dataset
        .dateTime || '',
    );

    return await eventsOfTheSlot.filter((event: any) => {
      const eventDate = new Date(event.startDateTime);

      return (
        eventDate.getHours() === timeSlotDayTime.getHours() &&
        eventDate.getDate() === timeSlotDayTime.getDate()
      );
    });
  }

  public async deleteEventById(targetId: string): Promise<void> {
    if (USE_JSON_SERVER) {
      await deleteEventById(targetId);
    } else {
      localStorage.setItem(
        'events',
        JSON.stringify(
          Object.fromEntries(
            Object.entries(this.getEvents()).map(
              ([key, itsEvents]: [string, any[]]) => {
                return [
                  key,
                  itsEvents.filter((event) => event.id !== targetId),
                ];
              },
            ),
          ),
        ),
      );
    }
  }

  public getMonthOfYear(): string {
    const referenceSunday = this.selectedWeek[0];
    return `${
      MONTHS[referenceSunday.getMonth()]
    } ${referenceSunday.getFullYear()}`;
  }

  private cachWeek(week: Date[], index: number): void {
    const cachedWeeks = JSON.parse(
      sessionStorage.getItem('cachedWeeks') || '[]',
    );
    cachedWeeks[index] = week;
    sessionStorage.setItem('cachedWeeks', JSON.stringify(cachedWeeks, null, 2));
  }

  public setSelectedWeek(date: Date, index: number): void | Date[] {
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

  public getSelectedWeek(): Date[] {
    return this.selectedWeek;
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  private async getEventsOfTheWeekBySlotIndex(): Promise<
    CalendarEventRecord[]
  > {
    // @ts-ignore
    return (await getEventsOfThisWeek(this.selectedWeek)).reduce(
      (acc: { [x: string]: CalendarEventRecord[] }, eventRecord) => {
        const { startDateTime: startDateTimeString } = eventRecord;

        const startDateTime = new Date(startDateTimeString);
        const day = startDateTime.getDay();
        const hour = startDateTime.getHours();
        const events = acc[`${day}-${hour}`] || [];
        events.push(eventRecord);

        acc[`${day}-${hour}`] = events;

        return acc;
      },
      {},
    );
  }
}

export default StorageService.getInstance();
