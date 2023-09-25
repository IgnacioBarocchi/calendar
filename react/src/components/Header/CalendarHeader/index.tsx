import {
  CalendarHeaderRowGrid,
  DayOfWeekItem,
  TimeZoneOffsetItem,
} from './CalendarHeaderElements';

import { FC } from 'react';
import { RootState } from '../../../store/@types';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

const CalendarHeaderRow: FC<{ gridArea: string }> = ({ gridArea }) => {
  const week = useSelector((state: RootState) => state.week);

  return (
    <CalendarHeaderRowGrid>
      <TimeZoneOffsetItem />
      {week.map((date) => (
        <DayOfWeekItem
          key={nanoid()}
          today={new Date().toDateString() === date.toDateString()}
          dateNumber={date.getDate()}
          weekDay={date.toLocaleDateString('en-US', { weekday: 'short' })}
        ></DayOfWeekItem>
      ))}
    </CalendarHeaderRowGrid>
  );
};

export default CalendarHeaderRow;
