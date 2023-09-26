import { CalendarCell } from '../UI';
import styled from 'styled-components';

export const CalendarBodyRowCell = styled(CalendarCell)`
  background: green;
`;

export const CalendarBodyColumnCell = styled(CalendarCell)``;

export const CalendarBodyContainer = styled.div<{ gridArea: string }>`
  background: green;
  grid-area: ${({ gridArea }) => gridArea};
  display: grid;
  grid-template-columns: 5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;
