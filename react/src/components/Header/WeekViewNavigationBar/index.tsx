import { Button, Text } from '../../UI';
import { FC, memo } from 'react';
import {
  WeekNavigationBarProps,
  shouldWeekViewNavigationBarPreventRender,
} from './helper';

import { ActionTypes } from '../../../store/@types';
import { Fonts } from '../../../constants/theme';
import Logo from '../Logo';
import Nav from '../Nav';
import { NavContainer } from './WeekViewNavigationBarElements';
import { VscColorMode } from 'react-icons/vsc';
// import { block } from 'million/react';
import i18n from '../../../i18n';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';

const WeekViewNavigationBar: FC<WeekNavigationBarProps> = memo(
  ({ gridArea, month, year, shouldDisplayLogo }) => {
    const dispatch = useDispatch();

    return (
      <NavContainer gridArea={gridArea}>
        {shouldDisplayLogo ? <Logo gridArea="" /> : null}
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
  shouldWeekViewNavigationBarPreventRender,
);

// export default block(WeekViewNavigationBar);
export default WeekViewNavigationBar;
