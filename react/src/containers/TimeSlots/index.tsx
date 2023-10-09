import React from 'react';
import { RootState } from '../../store/@types';
import { TimeIndexItem } from './TimeSlotsElements';
import { TimeSlot } from './TimeSlot';
import { nanoid } from 'nanoid';
import { newEventsMapSelector } from '../../store/selectors';
import { useSelector } from 'react-redux';

const TimeSlots = () => {
  const { week, eventsMap } = useSelector((state: RootState) => ({
    week: state.week,
    weekEvents: state.weekEvents,
    eventsMap: newEventsMapSelector(state),
  }));

  const hours = [...Array(24).keys()];

  return hours.map((timeIndex) => (
    <React.Fragment key={nanoid()}>
      <TimeIndexItem timeIndex={timeIndex} />
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

/*
  import React, { useMemo } from 'react';

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
*/
