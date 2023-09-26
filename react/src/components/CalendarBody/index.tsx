import { CalendarBodyContainer } from './CalendarBodyELements';
import { FC } from 'react';
import TimeSlots from '../../containers/TimeSlots';

const CalendarBody: FC<{ gridArea: string }> = ({ gridArea }) => {
  return (
    <CalendarBodyContainer gridArea={gridArea}>
      <TimeSlots />
    </CalendarBodyContainer>
  );
};

export default CalendarBody;
