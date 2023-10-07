import { Button, Link } from '../UI';

import { FaExternalLinkAlt } from 'react-icons/fa';
import styled from 'styled-components';

export const AsideContainer = styled.aside<{ gridArea: string }>`
  background: ${({ theme }) => theme.palette.background.primary};
  grid-area: ${({ gridArea }) => gridArea};
  padding: ${({ theme }) => theme.padding.aside};
`;

export const AsideContentWrapper = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.size.headerHeight};
  height: ${({ theme }) => `calc(100vh - ${theme.size.headerHeight})`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AsideFooterContainer = styled.footer`
  height: ${({ theme }) => `calc(${theme.size.headerHeight}/2)`};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const AsideFooter = () => (
  <AsideFooterContainer>
    <Link
      size="m"
      to="https://ignaciob30.editorx.io/clndr"
      Icon={FaExternalLinkAlt}
      label={'Wix'}
    />
    <Link
      size="m"
      to="https://github.com/ignaciobwix/calendar"
      Icon={FaExternalLinkAlt}
      label={'Github'}
    />
  </AsideFooterContainer>
);
