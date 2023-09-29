import styled from 'styled-components';

export const EventCreationPanelContainer = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: column;
  padding: ${({ theme }) => theme.padding.aside};
`;
