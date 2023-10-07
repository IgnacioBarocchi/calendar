import { CalendarEventContainer, DragabbleWrapper } from './TimeSlotsElements';
import { FC, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';

import { CalendarEvent } from '../../store/@types';
import { Text } from '../../components/UI';
import { debounce } from 'lodash';
import { getEventCSSValues } from './helper';

const CalendarEventView: FC<{
  parentHeight: number;
  parentWidth: number;
  timeSlotDate: Date;
  calendarEventRecord: CalendarEvent;
  index: number;
  maxIndex: number;
  onClick: (event: MouseEvent<Element, globalThis.MouseEvent>) => void;
}> = ({
  parentHeight,
  parentWidth,
  timeSlotDate,
  calendarEventRecord,
  index,
  maxIndex,
  onClick,
}) => {
  const [shouldHighlight, setShouldHighlight] = useState(false);

  const debouncedHover = useRef(
    debounce(async (value) => {
      setShouldHighlight(value);
    }, 300),
  ).current;

  useEffect(() => {
    return () => {
      debouncedHover.cancel();
    };
  }, [debouncedHover]);

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
    <DragabbleWrapper grid={[parentWidth, parentHeight / 4]}>
      <CalendarEventContainer
        shouldHighlight={shouldHighlight && maxIndex > 1}
        top={eventTopPosition}
        index={shouldHighlight ? maxIndex : index}
        height={Math.max(20, eventHeightPercentage)}
        onMouseOver={() => {
          if (maxIndex > 1) {
            debouncedHover(true);
          }
        }}
        onMouseOut={() => {
          if (maxIndex > 1) {
            debouncedHover(false);
          }
        }}
        onClick={onClick}
      >
        <Text size="m">{calendarEventRecord.title}</Text>
      </CalendarEventContainer>
    </DragabbleWrapper>
  );
};

export default CalendarEventView;
