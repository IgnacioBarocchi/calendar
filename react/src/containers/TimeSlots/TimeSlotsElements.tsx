import { ActionTypes, CalendarEvent } from '../../store/@types';
import { FC, MouseEvent } from 'react';

import { CalendarBodyColumnCell } from '../../components/CalendarBody/CalendarBodyELements';
import { CalendarCell } from '../../components/UI';
import { getActionFrom } from './helper';
import mouseHandler from '../../lib/mouseHandler';
import { nanoid } from 'nanoid';
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
  calendarEvents?: CalendarEvent[];
}> = ({ timeSlotDate, calendarEvents }) => {
  const dispatch = useDispatch();

  const handleOpenModalClick = (event: MouseEvent) => {
    mouseHandler(event, () => dispatch(getActionFrom(event, timeSlotDate)));
  };

  const handleOpenDetailsModalClick = (event: MouseEvent, eventId: string) => {
    mouseHandler(event, () => {
      dispatch({
        type: ActionTypes.UPDATE_EVENT_DETAILS_MODAL_STATE,
        payload: {
          isOpen: true,
          eventId,
        },
      });
    });
  };

  return (
    <CalendarCell onClick={handleOpenModalClick}>
      {calendarEvents?.length &&
        calendarEvents.map((calendarEventRecord) => (
          <CalendarEventContainer
            key={nanoid()}
            onClick={(mouseEvent: MouseEvent) =>
              handleOpenDetailsModalClick(mouseEvent, calendarEventRecord.id)
            }
          >
            {/* {draftTextContent} */}
            {calendarEventRecord.title}
          </CalendarEventContainer>
        ))}
    </CalendarCell>
  );
};
