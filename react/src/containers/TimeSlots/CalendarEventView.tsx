import { FC, MouseEvent, useMemo } from 'react';

import { CalendarEvent } from '../../store/@types';
import { CalendarEventContainer } from './TimeSlotsElements';
import { getEventCSSValues } from './helper';

const CalendarEventView: FC<{
  parentHeight: number;
  timeSlotDate: Date;
  calendarEventRecord: CalendarEvent;
  index: number;
  onClick: (event: MouseEvent<Element, globalThis.MouseEvent>) => void;
}> = ({ parentHeight, timeSlotDate, calendarEventRecord, index, onClick }) => {
  const [eventHeightPercentage, eventTopPosition] = useMemo(() => {
    return getEventCSSValues(
      calendarEventRecord.start,
      calendarEventRecord.end,
      timeSlotDate,
      parentHeight,
    );
  }, [
    calendarEventRecord.end,
    calendarEventRecord.start,
    parentHeight,
    timeSlotDate,
  ]);

  return (
    <CalendarEventContainer
      top={eventTopPosition}
      height={Math.max(20, eventHeightPercentage)}
      index={index}
      onClick={onClick}
    >
      {calendarEventRecord.title}
    </CalendarEventContainer>
  );
};

export default CalendarEventView;
