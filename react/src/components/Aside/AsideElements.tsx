import styled from 'styled-components';

export const AsideContainer = styled.aside<{ gridArea: string }>`
  background: ${({ theme }) => theme.palette.background.primary};
  grid-area: ${({ gridArea }) => gridArea};
`;
