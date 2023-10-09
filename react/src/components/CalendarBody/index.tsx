import { CalendarBodyContainer } from './CalendarBodyELements';
import ClockHand from '../ClockHand';
import { FC } from 'react';
import TimeSlots from '../../containers/TimeSlots';

const CalendarBody: FC<{ gridArea: string; asideIsHidden: boolean }> = ({
  gridArea,
  asideIsHidden,
}) => {
  return (
    <CalendarBodyContainer asideIsHidden={asideIsHidden} gridArea={gridArea}>
      <ClockHand />
      <TimeSlots />
    </CalendarBodyContainer>
  );
};

export default CalendarBody;
