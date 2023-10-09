import { CalendarCell, Text } from '../../components/UI';
import { FC, memo, useMemo } from 'react';
import styled, { css } from 'styled-components';

import Draggable from 'react-draggable';
import { Fonts } from '../../constants/theme';
import { useTranslation } from 'react-i18next';

export const TimeIndexItem: FC<{ timeIndex: number }> = memo(
  ({ timeIndex }) => {
    const { t } = useTranslation();

    const label = useMemo(() => {
      const time = new Date();
      time.setHours(timeIndex, 0, 0);

      const normalizedTimeIndex = time.toLocaleString(t('locale'), {
        hour: 'numeric',
        hour12: true,
      });
      return normalizedTimeIndex;
    }, [t, timeIndex]);

    return (
      <CalendarCell location={'header-column'}>
        <Text size="m" font={Fonts.SupremeBold}>
          {label}
        </Text>
      </CalendarCell>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.timeIndex === nextProps.timeIndex;
  },
);

export const DragabbleWrapper = styled(Draggable)``;

export const CalendarEventContainer = styled.div<{
  top: number;
  height: number;
  index: number;
  shouldHighlight: boolean;
}>`
  color: ${({ theme }) => theme.palette.foreground.primary};
  background: ${({ theme }) => theme.palette.brand};
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
  border: 1px solid
    ${({ theme, index }) =>
      index === 0 ? theme.palette.brand : theme.palette.foreground.primary};

  ${({ theme, shouldHighlight }) =>
    shouldHighlight
      ? css`
          box-shadow: 0 0 70px 18px ${theme.palette.foreground.tertiary};
        `
      : ''}
`;
