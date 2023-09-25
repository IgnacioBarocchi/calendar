import styled from 'styled-components';

export const AsideContainer = styled.aside<{ gridArea: string }>`
  background: ${({ theme }) => theme.bgPrimary};
  grid-area: ${({ gridArea }) => gridArea};
`;
