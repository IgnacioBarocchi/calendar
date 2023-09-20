import { MONTHS, USE_WEEK_CACHING } from '../constants/index';

import mapRange from '../lib/mapRange';

class StorageService {
  public selectedWeek: Date[] = [];
  private static instance: StorageService | null = null;

  private constructor() {
    window.addEventListener('beforeunload', () => {
      sessionStorage.clear();
    });

    this.setSelectedWeek(new Date(), 0);
    sessionStorage.setItem('cachedWeeks', JSON.stringify([]));
  }

  private _getEvents() {
    if (!localStorage.length) {
      localStorage.setItem('events', '{}');
    }
    return JSON.parse(localStorage.getItem('events') || '{}');
  }

  public saveEvent(event: any) {
    const events = this._getEvents();
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

  public getEventsBySlotIndex(slotIndex: string) {
    const events = this._getEvents();
    const eventsOfTheSlot = events[slotIndex];
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
          Object.entries(this._getEvents()).map(
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
}

export default StorageService.getInstance();
