import { Button, Text } from '../../UI';
import { FC, MouseEventHandler } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
  return <Button onClick={onClick} Icon={NavPreviousWeekIcon} />;
};

export const NextWeekButton: FC<{
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
  return <Button onClick={onClick} Icon={NavNextWeekIcon} />;
};

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
