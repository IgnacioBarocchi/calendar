import { Text } from '../../UI';
import styled from 'styled-components';

export const NavContainer = styled.div<{ gridArea: string }>`
  display: flex;
  align-items: center;
  grid-area: ${({ gridArea }) => gridArea};
  border-bottom: 1px solid ${({ theme }) => theme.palette.foreground.tertiary};
`;

export const WeekNavBar = styled.nav`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const MonthLabel = styled(Text)`
  margin-left: 8px;
  &:first-letter {
    text-transform: uppercase;
  }
`;
