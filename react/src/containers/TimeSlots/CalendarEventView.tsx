import { CalendarEventContainer, DragabbleWrapper } from './TimeSlotsElements';
import { FC, MouseEvent, useMemo } from 'react';

import { CAN_DRAG_EVENT } from '../../constants/experimentalFeatures';
import { CalendarEvent } from '../../store/@types';
import { getEventCSSValues } from './helper';

const CalendarEventView: FC<{
  parentHeight: number;
  parentWidth: number;
  timeSlotDate: Date;
  calendarEventRecord: CalendarEvent;
  index: number;
  onClick: (event: MouseEvent<Element, globalThis.MouseEvent>) => void;
}> = ({
  parentHeight,
  parentWidth,
  timeSlotDate,
  calendarEventRecord,
  index,
  onClick,
}) => {
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

  if (CAN_DRAG_EVENT)
    return (
      <DragabbleWrapper
        grid={[parentWidth, parentHeight]}
        onStop={() => {
          alert('update record');
        }}
      >
        <CalendarEventContainer
          top={eventTopPosition}
          height={Math.max(20, eventHeightPercentage)}
          index={index}
          onClick={onClick}
        >
          {calendarEventRecord.title}
        </CalendarEventContainer>
      </DragabbleWrapper>
    );

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
