import { Button, Link } from '../UI';

import { Fonts } from '../../constants/theme';
import { TbArrowUpRight } from 'react-icons/tb';
import styled from 'styled-components';

export const AsideContainer = styled.aside<{ gridArea: string }>`
  background: ${({ theme }) => theme.palette.background.primary};
  grid-area: ${({ gridArea }) => gridArea};
  padding: ${({ theme }) => theme.padding.aside};
  border-right: 1px solid ${({ theme }) => theme.palette.background.secondary};
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
      Icon={TbArrowUpRight}
      label={'Wix'}
      font={Fonts.SupremeBold}
    />
    <Link
      size="m"
      to="https://github.com/ignaciobwix/calendar"
      Icon={TbArrowUpRight}
      label={'Github'}
      font={Fonts.SupremeBold}
    />
  </AsideFooterContainer>
);
