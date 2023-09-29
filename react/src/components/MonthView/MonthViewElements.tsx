import { FC, MouseEventHandler } from 'react';

import { Text } from '../UI';
import { nanoid } from 'nanoid';
import styled from 'styled-components';

export const MonthViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 4px;
  padding: 1rem;
`;

const MonthViewItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: ${({ theme }) => theme.palette.foreground.primary};
`;

const DateItem = styled.button`
  background: none;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.palette.foreground.primary};
  cursor: pointer;
`;

export const MonthViewItem: FC<{
  date: number;
  handler: MouseEventHandler<HTMLButtonElement>;
}> = ({ date, handler }) => {
  return (
    <MonthViewItemContainer>
      <DateItem onClick={handler}>{date}</DateItem>
    </MonthViewItemContainer>
  );
};

export const MonthDatesHeader: FC<{ week: Date[] }> = ({ week }) => {
  return (
    <>
      {week.map((date) => (
        <MonthViewItemContainer key={nanoid()}>
          <Text size="s" weight="bold">
            {date.toLocaleDateString('en-US', { weekday: 'short' })}
          </Text>
        </MonthViewItemContainer>
      ))}
    </>
  );
};
