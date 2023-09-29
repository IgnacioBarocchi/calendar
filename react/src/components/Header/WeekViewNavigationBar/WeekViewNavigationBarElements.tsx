import { FC, MouseEventHandler } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { Button } from '../../UI';
import styled from 'styled-components';

export const NavContainer = styled.div<{ gridArea: string }>`
  display: flex;
  align-items: center;
  grid-area: ${({ gridArea }) => gridArea};
  border-bottom: 1px solid ${({ theme }) => theme.palette.foreground.tertiary};
`;

const NavPreviousWeekIcon = styled(FaArrowLeft)`
  color: ${({ theme }) => theme.palette.foreground.primary};
`;

const NavNextWeekIcon = styled(FaArrowRight)`
  color: ${({ theme }) => theme.palette.foreground.primary};
`;

export const PrevWeekButton: FC<{
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <NavPreviousWeekIcon />
    </Button>
  );
};

export const NextWeekButton: FC<{
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <NavNextWeekIcon />
    </Button>
  );
};

export const WeekNavBar = styled.nav`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;
