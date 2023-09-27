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

  const [eventsMap, setEventsMap] = useState<Map<string, CalendarEvent[]>>(
    new Map<string, CalendarEvent[]>(),
  );

  useEffect(() => {
    weekEvents.forEach((event) => {
      const matchingStartTime = new Date(event.start);
      matchingStartTime.setMinutes(0);
      matchingStartTime.setSeconds(0);
      matchingStartTime.setMilliseconds(0);

      const key = matchingStartTime.toISOString();

      if (!eventsMap.has(key)) {
        eventsMap.set(key, []);
      }

      eventsMap.get(key)?.push(event);
    });

    setEventsMap(eventsMap);
  }, [week, weekEvents]);

  return [...Array(24).keys()].map((timeIndex) => (
    <React.Fragment key={nanoid()}>
      <TimeIndexItem key={nanoid()} timeIndex={timeIndex} />
      {week.map((date) => {
        const normalizedSlotDateTime = new Date(
          date.setHours(timeIndex, 0, 0, 0),
        );
        const events = eventsMap.get(normalizedSlotDateTime.toISOString());

        return (
          <TimeSlot
            key={nanoid()}
            timeSlotDate={normalizedSlotDateTime}
            calendarEvents={events}
          />
        );
      })}
    </React.Fragment>
  ));
};

export default TimeSlots;
