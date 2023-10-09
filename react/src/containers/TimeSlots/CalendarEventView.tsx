import { CalendarEventContainer, DragabbleWrapper } from './TimeSlotsElements';
import { FC, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { getDateTimeString, getEventCSSValues } from './helper';

import { CalendarEvent } from '../../store/@types';
import { Fonts } from '../../constants/theme';
import { Text } from '../../components/UI';
import { debounce } from 'lodash';

const CalendarEventView: FC<CalendarEventViewProps> = ({
  parentHeight,
  parentWidth,
  timeSlotDate,
  calendarEventRecord,
  index,
  maxIndex,
  onClick,
  use_experimental_drag_events,
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

  const dateTimeString = useMemo(
    () => getDateTimeString(calendarEventRecord),
    [calendarEventRecord.end, calendarEventRecord.start],
  );

  if (use_experimental_drag_events)
    return (
      <DragabbleWrapper grid={[parentWidth, parentHeight / 4]}>
        <CalendarEventContainer
          shouldHighlight={
            shouldHighlight && maxIndex > 1 ? shouldHighlight : false
          }
          top={eventTopPosition}
          index={shouldHighlight ? maxIndex : index}
          height={Math.max(20, eventHeightPercentage)}
          onClick={onClick}
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
        >
          <Text size="m" font={Fonts.SupremeExtrabold}>
            {calendarEventRecord.title}
          </Text>
          <Text size="m" font={Fonts.SupremeBold}>
            {dateTimeString}
          </Text>
        </CalendarEventContainer>
      </DragabbleWrapper>
    );

  return (
    <CalendarEventContainer
      shouldHighlight={
        shouldHighlight && maxIndex > 1 ? shouldHighlight : false
      }
      top={eventTopPosition}
      index={shouldHighlight ? maxIndex : index}
      height={Math.max(20, eventHeightPercentage)}
      onClick={onClick}
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
    >
      <Text size="m" font={Fonts.SupremeExtrabold}>
        {calendarEventRecord.title}
      </Text>
      <Text size="m" font={Fonts.SupremeBold}>
        {dateTimeString}
      </Text>
    </CalendarEventContainer>
  );
};

export default CalendarEventView;

interface CalendarEventViewProps {
  use_experimental_drag_events: boolean;
  parentHeight: number;
  parentWidth: number;
  timeSlotDate: Date;
  calendarEventRecord: CalendarEvent;
  index: number;
  maxIndex: number;
  onClick: (event: MouseEvent<Element, globalThis.MouseEvent>) => void;
}
