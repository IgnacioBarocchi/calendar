import { ActionTypes, CalendarEvent } from '../../store/@types';
import { FC, MouseEvent } from 'react';

import { CalendarBodyColumnCell } from '../../components/CalendarBody/CalendarBodyELements';
import { CalendarCell } from '../../components/UI';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

export const TimeIndexItem: FC<{ timeIndex: number }> = ({ timeIndex }) => {
  const time = new Date();
  time.setHours(timeIndex, 0, 0);

  const normalizedTimeIndex = time.toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true,
  });

  return <CalendarBodyColumnCell>{normalizedTimeIndex}</CalendarBodyColumnCell>;
};

// todo: can be a dragable cmp. if we know the grid.
const CalendarEventContainer = styled.div`
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.accent};
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
  calendarEvent?: CalendarEvent;
}> = ({ timeSlotDate, calendarEvent }) => {
  const dispatch = useDispatch();

  const handleOpenModalClick = (event: MouseEvent) => {
    event.stopPropagation();

    dispatch({
      type: ActionTypes.UPDATE_EVENT_CREATION_MODAL_VISIBILITY,
      payload: {
        isOpen: true,
        placeHolderDates: {
          start: timeSlotDate.toISOString(),
          end: new Date(timeSlotDate.setHours(0, 30, 0)).toISOString(),
        },
      },
    });
  };

  const handleOpenDetailsModalClick = (event: MouseEvent) => {
    event.stopPropagation();

    dispatch({
      type: ActionTypes.UPDATE_EVENT_CREATION_MODAL_VISIBILITY,
      payload: {
        isOpen: true,
        event: {},
      },
    });
  };

  const draftTextContent = `no title ${timeSlotDate.toISOString()} - ${timeSlotDate.toISOString()}`;

  return (
    <CalendarCell onClick={handleOpenModalClick}>
      {calendarEvent && (
        <CalendarEventContainer onClick={handleOpenDetailsModalClick}>
          {draftTextContent}
        </CalendarEventContainer>
      )}
    </CalendarCell>
  );
};
