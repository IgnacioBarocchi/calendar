import {
  CalendarHeaderRowGrid,
  DayOfWeekItem,
  TimeZoneOffsetItem,
} from './CalendarHeaderElements';
import { FC, memo } from 'react';

import { Week } from '../../../lib/weekHelper';
import { nanoid } from 'nanoid';

const areEqual = (
  prevProps: CalendarHeaderRowProps,
  nextProps: CalendarHeaderRowProps,
) => prevProps.week[0].toDateString() === nextProps.week[0].toDateString();

const CalendarHeaderRow: FC<CalendarHeaderRowProps> = memo(
  ({ gridArea, week }) => {
    return (
      <CalendarHeaderRowGrid gridArea={gridArea}>
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
  },
  areEqual,
);

export default CalendarHeaderRow;

interface CalendarHeaderRowProps {
  gridArea: string;
  week: Week;
}
