import styled from 'styled-components';

export const MainContainer = styled.main`
  margin-top: ${({ theme }) => theme.size.headerHeight};
  display: grid;
  height: 100vh;
  /*grid-template-columns: 0.2fr 1fr;*/
  grid-template-columns: ${({ theme }) =>
    `${theme.size.asideWidth} calc(100vw - ${theme.size.asideWidth})`};
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: 'aside calendar';
  overflow: hidden;
`;
