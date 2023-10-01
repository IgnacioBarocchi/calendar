import { ActionTypes, CalendarEvent } from '../../store/@types';
import { CalendarCell, Text } from '../../components/UI';
import { FC, MouseEvent } from 'react';

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
const CalendarEventContainer = styled.div`
  color: ${({ theme }) => theme.palette.foreground.primary};
  background: ${({ theme }) => theme.palette.brand};
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
  width: calc(100% - 8px);
`;

export const TimeSlot: FC<{
  timeSlotDate: Date;
  calendarEvents?: CalendarEvent[];
}> = ({ timeSlotDate, calendarEvents }) => {
  const dispatch = useDispatch();

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
    <CalendarCell location={'body'} onClick={handleOpenModalClick}>
      {calendarEvents?.length &&
        calendarEvents.map((calendarEventRecord) => (
          <CalendarEventContainer
            key={nanoid()}
            onClick={(mouseEvent: MouseEvent) =>
              pressableInterceptor(
                mouseEvent,
                handleOpenDetailsModalClick(mouseEvent, calendarEventRecord),
              )
            }
          >
            {calendarEventRecord.title}
          </CalendarEventContainer>
        ))}
    </CalendarCell>
  );
};
