import { CalendarBodyContainer } from './CalendarBodyElements';
import ClockHand from '../ClockHand';
import { FC } from 'react';
import TimeSlots from '../../containers/TimeSlots';

const CalendarBody: FC<{ gridArea: string }> = ({ gridArea }) => {
  return (
    <CalendarBodyContainer gridArea={gridArea}>
      <ClockHand />
      <TimeSlots />
    </CalendarBodyContainer>
  );
};

export default CalendarBody;
