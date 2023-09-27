import { CalendarEvent, RootState } from '../../store/@types';
import React, { useEffect, useState } from 'react';
import { TimeIndexItem, TimeSlot } from './TimeSlotsElements';

import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

const TimeSlots = () => {
  const { week, weekEvents } = useSelector((state: RootState) => ({
    week: state.week,
    weekEvents: state.weekEvents,
  }));

  const [slotRecords, setSlotRecords] = useState<SlotRecord[]>([]);

  useEffect(() => {
    const eventsMap = new Map<string, CalendarEvent[]>();

    weekEvents.forEach((event) => {
      const startTime = new Date(event.start);
      startTime.setMinutes(0);
      startTime.setSeconds(0);

      const key = startTime.toISOString();

      if (!eventsMap.has(key)) {
        eventsMap.set(key, []);
      }

      eventsMap.get(key)?.push(event);
    });

    const slotRecords = week.map((date) => {
      const key = date.toISOString();
      return {
        date,
        events: eventsMap.get(key) || [],
      };
    });

    setSlotRecords(slotRecords);
  }, [week, weekEvents]);

  console.log(weekEvents);

  return [...Array(24).keys()].map((timeIndex) => (
    <React.Fragment key={nanoid()}>
      <TimeIndexItem key={nanoid()} timeIndex={timeIndex} />
      {slotRecords.map(({ date, events }: SlotRecord) => (
        <TimeSlot
          key={nanoid()}
          timeSlotDate={new Date(date.setHours(timeIndex, 0, 0))}
          calendarEvents={events}
        />
      ))}
    </React.Fragment>
  ));
};

export default TimeSlots;

interface SlotRecord {
  date: Date;
  events?: CalendarEvent[];
}
