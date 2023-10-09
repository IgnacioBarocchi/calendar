import { Button, Text } from '../../UI';
import { Dispatch, FC } from 'react';
import { toggleExperiments, toggleTheme } from '../../../store/actions';

import { AnyAction } from 'redux';
import { Fonts } from '../../../constants/theme';
import { IconType } from 'react-icons';
import { VscColorMode } from 'react-icons/vsc';
import i18n from '../../../i18n';
import styled from 'styled-components';
import { t } from 'i18next';

export const NavContainer = styled.div<{ gridArea: string }>`
  display: flex;
  align-items: center;
  grid-area: ${({ gridArea }) => gridArea};
  & * {
    margin-right: 8px;
  }
`;

export const WeekNavBar = styled.nav`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const MonthAndYearContent: FC<{ month: string; year: number }> = ({
  month,
  year,
}) => (
  <div style={{ display: 'flex' }}>
    <Text size="l" weight="bold" font={Fonts.SupremeBold}>
      {month}
    </Text>
    <Text size="l" weight="bold" font={Fonts.SupremeBold}>
      {year}
    </Text>
  </div>
);

export const Buttons: FC<{
  dispatch: Dispatch<AnyAction>;
  SelectedIcon: IconType;
}> = ({ dispatch, SelectedIcon }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        label={t('language.label')}
        size="l"
        onClick={() => {
          i18n.changeLanguage(t('language.key'));
        }}
      />
      <Button
        Icon={VscColorMode}
        size="l"
        onClick={() => {
          dispatch(toggleTheme());
        }}
      />
      <Button
        Icon={SelectedIcon}
        size="l"
        label="Experiments"
        onClick={() => {
          dispatch(toggleExperiments());
        }}
      />
    </div>
  );
};
