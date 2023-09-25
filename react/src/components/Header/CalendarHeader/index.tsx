import {
  CalendarHeaderRowGrid,
  DayOfWeekItem,
  TimeZoneOffsetItem,
} from './CalendarHeaderElements';

import { RootState } from '../../../store/@types';
import { useSelector } from 'react-redux';

const CalendarHeaderRow = () => {
  const week = useSelector((state: RootState) => state.week);

  return (
    <CalendarHeaderRowGrid>
      <TimeZoneOffsetItem />
      {week.map((date) => (
        <DayOfWeekItem
          today={new Date().toDateString() === date.toDateString()}
          dateNumber={date.getDate()}
          weekDay={date.toLocaleDateString('en-US', { weekday: 'short' })}
        ></DayOfWeekItem>
      ))}
    </CalendarHeaderRowGrid>
  );
};

export default CalendarHeaderRow;
