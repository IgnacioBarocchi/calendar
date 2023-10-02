import styled from 'styled-components';

export const CalendarBodyContainer = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  display: grid;
  grid-template-columns: ${({ theme }) => theme.size.timeCellWidth} 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;
