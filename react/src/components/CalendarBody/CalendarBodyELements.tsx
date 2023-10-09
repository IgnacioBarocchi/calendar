import styled, { css } from 'styled-components';

export const CalendarBodyContainer = styled.div<{
  gridArea: string;
  asideIsHidden: boolean;
}>`
  overflow-x: hidden;
  display: grid;
  grid-template-columns: ${({ theme }) => theme.size.timeCellWidth} 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  width: calc(100% + 2px);
  ${({ gridArea, asideIsHidden }) =>
    asideIsHidden
      ? css`
          width: 100vw;
        `
      : css`
          grid-area: ${gridArea};
        `};
`;
