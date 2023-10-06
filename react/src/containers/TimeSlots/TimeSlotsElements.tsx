import { CalendarCell, Text } from '../../components/UI';

import { FC } from 'react';
import styled from 'styled-components';

export const TimeIndexItem: FC<{ timeIndex: number }> = ({ timeIndex }) => {
  const time = new Date();
  time.setHours(timeIndex, 0, 0);

  const normalizedTimeIndex = time.toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true,
  });

  return (
    <CalendarCell location={'header-column'}>
      <Text size="m">{normalizedTimeIndex}</Text>
    </CalendarCell>
  );
};

export const CalendarEventContainer = styled.div<{
  top: number;
  height: number;
  index: number;
}>`
  color: ${({ theme, index }) =>
    Number.isInteger(index / 2)
      ? theme.palette.foreground.primary
      : theme.palette.brand};
  background: ${({ theme, index }) =>
    Number.isInteger(index / 2)
      ? theme.palette.brand
      : theme.palette.foreground.primary};
  text-align: left;
  padding: 4px;
  border-radius: 4px;
  z-index: 2;
  word-wrap: break-word;
  overflow: hidden;
  min-height: 32px;
  cursor: pointer;
  user-select: none;
  font-size: 0.7rem;
  width: calc(85% - ${({ index }) => index * 10}%);
  position: absolute;
  top: ${({ top }) => top}%;
  left: ${({ index }) => index * 10}%;
  height: ${({ height }) => height}%;
  z-index: ${({ index }) => index};
  border: 1px solid ${({ theme }) => theme.palette.brand};
`;
