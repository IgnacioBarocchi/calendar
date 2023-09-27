import { FC } from 'react';
import { MonthViewItem } from '../UI';
import { nanoid } from 'nanoid';
import styled from 'styled-components';

export const MonthViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 4px;
`;

export const MonthDatesHeader: FC<{ week: Date[] }> = ({ week }) => {
  return (
    <>
      {week.map((date) => (
        <MonthViewItem key={nanoid()}>
          <span>{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
        </MonthViewItem>
      ))}
    </>
  );
};
