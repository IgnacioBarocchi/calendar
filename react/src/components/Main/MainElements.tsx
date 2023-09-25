import { HEADER_HEIGHT } from '../../constants/theme';
import styled from 'styled-components';

export const MainContainer = styled.main`
  margin-top: ${HEADER_HEIGHT};
  display: grid;
  height: 100vh;
  grid-template-columns: 0.2fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: 'aside calendar';
`;
