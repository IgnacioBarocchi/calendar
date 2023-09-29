import { Text } from '../UI';
import styled from 'styled-components';

export const AsideContainer = styled.aside<{ gridArea: string }>`
  background: ${({ theme }) => theme.palette.background.primary};
  grid-area: ${({ gridArea }) => gridArea};
  padding: ${({ theme }) => theme.padding.aside};
`;

export const AsideContentWrapper = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.size.headerHeight};
`;

const AsideFooterContainer = styled.footer``;

export const AsideFooter = () => (
  <AsideFooterContainer>
    <a href="https://github.com/ignaciobwix/calendar">
      <Text>Hola</Text>
    </a>
  </AsideFooterContainer>
);
