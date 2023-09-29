import { CalendarCell } from '../UI';
import styled from 'styled-components';

export const CalendarBodyRowCell = styled(CalendarCell)`
  &:nth-child(n + 186):nth-child(-n + 192) {
    border-bottom: none;
  }
`;

export const CalendarBodyColumnCell = styled(CalendarCell)`
  ${({ theme }) => {
    return `
      background: linear-gradient(
        ${theme.palette.background.primary},
        ${theme.palette.background.primary}
      )
      50% 50% / calc(100% - 2px) calc(100% - 2px) no-repeat,
      linear-gradient(90deg, transparent 0%, ${theme.palette.foreground.tertiary} 100%);
   `;
  }}
  height: 100%;
  border: none;
`;

export const CalendarBodyContainer = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  display: grid;
  grid-template-columns: 5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;
