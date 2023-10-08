import { Button, Text } from '../UI';
import { FC, MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

import { Fonts } from '../../constants/theme';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';

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
// background: ${({ theme }) => theme.palette.background.secondary};

const DateItem = styled(Button)<{ today: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ theme, today }) =>
    today ? theme.palette.brand : 'transparent'};

  ${({ theme, today }) =>
    today
      ? css`
          &:hover {
            & span {
              background: red;
              text-decoration: none;
            }
          }
        `
      : css`
          &:hover {
            & span {
              background: ${theme.palette.background.secondary};
              text-decoration: none;
            }
          }
        `}
`;

export const MonthViewItem: FC<{
  date: number;
  today: boolean;
  handler: MouseEventHandler;
}> = ({ date, today, handler }) => {
  return (
    <MonthViewItemContainer>
      <DateItem onClick={handler} label={date} size={'s'} today={today} />
    </MonthViewItemContainer>
  );
};

export const MonthDatesHeader: FC<{ week: Date[] }> = ({ week }) => {
  const { t } = useTranslation();

  return (
    <>
      {week.map((date) => (
        <MonthViewItemContainer key={nanoid()}>
          <Text size="s" weight="bold" font={Fonts.SupremeBold}>
            {date
              .toLocaleDateString(t('locale'), {
                weekday: 'short',
              })
              .toUpperCase()}
          </Text>
        </MonthViewItemContainer>
      ))}
    </>
  );
};
