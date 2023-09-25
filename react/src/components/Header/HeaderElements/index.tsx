import styled from 'styled-components';

export const CalendarHeaderRowGrid = styled.div`
  grid-area: calendar-header;
  display: grid;
  grid-template-columns: 5rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export const CalendarHeaderItem = styled.div`
  border: ${({ theme }) => '1px solid' + theme.tertiary};
  padding: 10px;
  text-align: center;
`;
