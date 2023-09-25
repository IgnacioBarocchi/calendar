import styled from 'styled-components';

export const EventCreationPanelContainer = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
`;
