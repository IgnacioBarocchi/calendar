import { TimeIndexItem, TimeSlot } from './CalendarBodyELements';

import { FC } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';

const Container = styled.div<{ gridArea: string }>`
  background-color: green;
  grid-area: ${({ gridArea }) => gridArea};
  display: grid;
  grid-template-columns: 5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const CalendarBody: FC<{ gridArea: string }> = ({ gridArea }) => {
  return (
    <Container gridArea={gridArea}>
      {[...Array(24).keys()].map((timeIndex) => (
        <>
          <TimeIndexItem key={nanoid()} timeIndex={timeIndex} />
          {[...Array(7).keys()].map((weekDayNumber) => (
            <TimeSlot key={nanoid()}>{weekDayNumber}</TimeSlot>
          ))}
        </>
      ))}
    </Container>
  );
};

export default CalendarBody;
