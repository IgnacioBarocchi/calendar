// todo:q? refactor this component
import { ActionTypes, CalendarEvent } from '../../store/@types';
import { CalendarCell, Text } from '../../components/UI';
import { FC, MouseEvent, useEffect, useRef, useState } from 'react';

// todo:q? ask rejus how to calculate the calendar event size and position
//? import { desktopGeneric } from '../../constants/theme';
import { getActionFrom } from './helper';
import { nanoid } from 'nanoid';
import pressableInterceptor from '../../lib/pressable';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

export const TimeIndexItem: FC<{ timeIndex: number }> = ({ timeIndex }) => {
  const time = new Date();
  time.setHours(timeIndex, 0, 0);

  const normalizedTimeIndex = time.toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true,
  });

  return (
    <CalendarCell location={'header-column'}>
      <Text size="m">{normalizedTimeIndex}</Text>
    </CalendarCell>
  );
};

// todo: can be a dragable cmp. if we know the grid.
const CalendarEventContainer = styled.div<{
  top: number;
  height: number;
  index: number;
}>`
  color: ${({ theme, index }) =>
    Number.isInteger(index / 2)
      ? theme.palette.foreground.primary
      : theme.palette.brand};
  background: ${({ theme, index }) =>
    Number.isInteger(index / 2)
      ? theme.palette.brand
      : theme.palette.foreground.primary};
  text-align: left;
  padding: 4px;
  border-radius: 4px;
  top: 0;
  z-index: 2;
  word-wrap: break-word;
  overflow: hidden;
  min-height: 32px;
  cursor: pointer;
  user-select: none;
  font-size: 0.7rem;
  width: calc(85% - ${({ index }) => index * 10}%);
  position: absolute;
  top: ${({ top }) => top}%;
  left: ${({ index }) => index * 10}%;
  height: ${({ height }) => height}%;
  z-index: ${({ index }) => index};
  border: 1px solid ${({ theme }) => theme.palette.brand};
`;

export const TimeSlot: FC<{
  timeSlotDate: Date;
  calendarEvents?: CalendarEvent[];
}> = ({ timeSlotDate, calendarEvents }) => {
  const dispatch = useDispatch();
  const [timeSlotPixelsHeight, setTimeSlotPixelsHeight] = useState(0);
  const elementRef = useRef<typeof CalendarCell & HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef?.current) return;
    setTimeSlotPixelsHeight(elementRef.current.offsetHeight);
  }, []);

  const handleOpenModalClick = (event: MouseEvent) => {
    // alert(timeSlotDate);
    dispatch(getActionFrom(event, timeSlotDate));
  };

  const handleOpenDetailsModalClick = (
    mouseEvent: MouseEvent,
    calendarEventRecord: CalendarEvent,
  ) => {
    dispatch({
      type: ActionTypes.UPDATE_EVENT_DETAILS_MODAL_STATE,
      payload: {
        isOpen: true,
        calendarEventRecord,
        position: {
          xRate: mouseEvent.clientX,
          yRate: mouseEvent.clientY,
        },
      },
    });
  };

  return (
    <CalendarCell
      location={'body'}
      onClick={handleOpenModalClick}
      ref={elementRef}
    >
      {calendarEvents?.length &&
        calendarEvents.map((calendarEventRecord, i) => {
          // todo: move component to other file and use useMemo(()=>{cmp height}, [ window.innerHeight? || add resize event listener? ])
          const startDateTime = new Date(calendarEventRecord.start);

          const timeDifference =
            startDateTime.valueOf() -
            new Date(calendarEventRecord.end).valueOf();

          const secondsLong = Math.abs(Math.floor(timeDifference / 1000));
          const eventHeightPercentage =
            ((secondsLong * 100) / (3600 * timeSlotPixelsHeight)) * 100;

          const timeDifferenceMinutes =
            (startDateTime.valueOf() - timeSlotDate.valueOf()) / (1000 * 60);

          const eventTopPosition =
            timeDifferenceMinutes < 0 ? 0 : (timeDifferenceMinutes / 60) * 100;

          return (
            <CalendarEventContainer
              top={eventTopPosition}
              height={eventHeightPercentage < 20 ? 20 : eventHeightPercentage}
              index={i}
              key={nanoid()}
              onClick={(mouseEvent: MouseEvent) =>
                pressableInterceptor(mouseEvent, () => {
                  handleOpenDetailsModalClick(mouseEvent, calendarEventRecord);
                })
              }
            >
              {calendarEventRecord.title}
            </CalendarEventContainer>
          );
        })}
    </CalendarCell>
  );
};
