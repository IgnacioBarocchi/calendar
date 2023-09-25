import { CalendarCell } from '../UI/UI';
import { FC } from 'react';
import styled from 'styled-components';

export const CalendarBodyRowCell = styled(CalendarCell)`
  background: green;
`;

export const CalendarBodyColumnCell = styled(CalendarCell)``;

export const TimeIndexItem: FC<{ timeIndex: number }> = ({ timeIndex }) => {
  const time = new Date();
  time.setHours(timeIndex, 0, 0);

  const normalizedTimeIndex = time.toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true,
  });

  return <CalendarBodyColumnCell>{normalizedTimeIndex}</CalendarBodyColumnCell>;
};

export const TimeSlot = styled(CalendarCell)``;
