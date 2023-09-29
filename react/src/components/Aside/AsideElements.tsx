import styled from 'styled-components';

export const AsideContainer = styled.aside<{ gridArea: string }>`
  background: ${({ theme }) => theme.palette.background.primary};
  grid-area: ${({ gridArea }) => gridArea};
`;

export const AsideContentWrapper = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.size.headerHeight};
`;
