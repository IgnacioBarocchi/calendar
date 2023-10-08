import { Button, Text } from '../../UI';
import { FC, memo } from 'react';

import { ActionTypes } from '../../../store/@types';
import { Fonts } from '../../../constants/theme';
import Nav from '../Nav';
import { NavContainer } from './WeekViewNavigationBarElements';
import { VscColorMode } from 'react-icons/vsc';
import { block } from 'million/react';
import i18n from '../../../i18n';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';

const WeekViewNavigationBar: FC<{
  gridArea: string;
  month: string;
  year: number;
}> = memo(
  ({ gridArea, month, year }) => {
    const dispatch = useDispatch();

    return (
      <NavContainer gridArea={gridArea}>
        <Nav />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex' }}>
            <Text size="l" weight="bold" font={Fonts.SupremeBold}>
              {month}
            </Text>
            <Text size="l" weight="bold" font={Fonts.SupremeBold}>
              {year}
            </Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              label={t('language.label')}
              size="l"
              font={Fonts.SupremeBold}
              onClick={() => {
                i18n.changeLanguage(t('language.key'));
              }}
            />
            <Button
              Icon={VscColorMode}
              size="l"
              font={Fonts.SupremeBold}
              onClick={() => {
                dispatch({ type: ActionTypes.TOGGLE_THEME });
              }}
            />
          </div>
        </div>
      </NavContainer>
    );
  },
  (oldProps, nextProps) =>
    oldProps.month === nextProps.month && oldProps.year === nextProps.year,
);

export default block(WeekViewNavigationBar);
