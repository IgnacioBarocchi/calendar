import styled, { css } from 'styled-components';

export const CalendarBodyContainer = styled.div<{
  gridArea: string;
  asideIsHidden: boolean;
}>`
  display: grid;
  grid-template-columns: ${({ theme }) => theme.size.timeCellWidth} 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  ${({ gridArea, asideIsHidden }) =>
    asideIsHidden
      ? css`
          width: 100vw;
        `
      : css`
          grid-area: ${gridArea};
        `};
`;
