import { TimeIndexItem, TimeSlot } from './CalendarBodyELements';

import { FC } from 'react';
import { RootState } from '../../store/@types';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div<{ gridArea: string }>`
  background: green;
  grid-area: ${({ gridArea }) => gridArea};
  display: grid;
  grid-template-columns: 5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const CalendarBody: FC<{ gridArea: string }> = ({ gridArea }) => {
  const week = useSelector((state: RootState) => state.week);

  return (
    <Container gridArea={gridArea}>
      {[...Array(24).keys()].map((timeIndex) => (
        <>
          <TimeIndexItem key={nanoid()} timeIndex={timeIndex} />
          {week.map((date: Date) => {
            return (
              <TimeSlot
                timeSlotDate={new Date(date.setHours(timeIndex, 0, 0))}
                calendarEvent={{
                  id: '2222',
                  type: 'upcoming',
                  start: new Date(),
                  end: new Date(),
                  title: 'm',
                }}
                key={nanoid()}
              ></TimeSlot>
            );
          })}
        </>
      ))}
    </Container>
  );
};

export default CalendarBody;
