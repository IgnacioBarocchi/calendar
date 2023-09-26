import { TimeIndexItem, TimeSlot } from './TimeSlotElements';

import { RootState } from '../../store/@types';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

const TimeSlots = () => {
  const week = useSelector((state: RootState) => state.week);

  return [...Array(24).keys()].map((timeIndex) => (
    <>
      <TimeIndexItem key={nanoid()} timeIndex={timeIndex} />
      {week.map((date: Date) => {
        return (
          <TimeSlot
            timeSlotDate={new Date(date.setHours(timeIndex, 0, 0))}
            calendarEvent={{
              id: '2222',
              type: 'upcoming',
              start: new Date(),
              end: new Date(),
              title: 'm',
            }}
            key={nanoid()}
          ></TimeSlot>
        );
      })}
    </>
  ));
};

export default TimeSlots;
