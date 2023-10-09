import styled from 'styled-components';

export const NavContainer = styled.div<{ gridArea: string }>`
  display: flex;
  align-items: center;
  grid-area: ${({ gridArea }) => gridArea};
  & * {
    margin-right: 8px;
  }
`;

export const WeekNavBar = styled.nav`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;
