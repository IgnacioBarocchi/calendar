import { FC, MouseEventHandler } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { Button } from '../../UI/UI';
import styled from 'styled-components';

const NavPreviousWeekIcon = styled(FaArrowLeft)`
  color: red;
`;

const NavNextWeekIcon = styled(FaArrowRight)`
  color: red;
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
