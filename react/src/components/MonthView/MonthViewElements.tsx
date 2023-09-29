import { Button, Text } from '../UI';
import { FC, MouseEventHandler } from 'react';

import { nanoid } from 'nanoid';
import styled from 'styled-components';

export const MonthViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 4px;
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

export const MonthViewItem: FC<{
  date: number;
  handler: MouseEventHandler;
}> = ({ date, handler }) => {
  return (
    <MonthViewItemContainer>
      <Button onClick={handler} label={date} size={'s'} />
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
