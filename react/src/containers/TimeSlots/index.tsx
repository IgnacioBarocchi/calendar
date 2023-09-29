import { CalendarEvent, RootState } from '../../store/@types';
import React, { useMemo } from 'react';
import { TimeIndexItem, TimeSlot } from './TimeSlotsElements';

import { getMapKeyFrom } from './helper';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

const TimeSlots = () => {
  const { week, weekEvents } = useSelector((state: RootState) => ({
    week: state.week,
    weekEvents: state.weekEvents,
  }));

  const eventsMap = useMemo(() => {
    const newEventsMap = new Map<string, CalendarEvent[]>();

    weekEvents.forEach((event) => {
      const key = getMapKeyFrom(event.start);

      if (!newEventsMap.has(key)) {
        newEventsMap.set(key, []);
      }

      newEventsMap.get(key)?.push(event);
    });

    return newEventsMap;
  }, [weekEvents]);

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
