import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import {
  Buttons,
  MonthAndYearContent,
  NavContainer,
} from './WeekViewNavigationBarElements';
import { FC, memo } from 'react';
import {
  WeekNavigationBarProps,
  shouldWeekViewNavigationBarPreventRender,
} from './helper';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../Logo';
import Nav from '../Nav';
import { RootState } from '../../../store/@types';

const WeekViewNavigationBar: FC<WeekNavigationBarProps> = memo(
  ({ gridArea, month, year, shouldDisplayLogo }) => {
    const dispatch = useDispatch();

    const experimentalFeatures = useSelector(
      (state: RootState) => state.experimentalFeatures,
    );

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
          <MonthAndYearContent year={year} month={month} />
          <Buttons
            SelectedIcon={experimentalFeatures ? BsToggleOn : BsToggleOff}
            dispatch={dispatch}
          />
        </div>
      </NavContainer>
    );
  },
  shouldWeekViewNavigationBarPreventRender,
);

export default WeekViewNavigationBar;

// import { block } from 'million/react';
// export default block(WeekViewNavigationBar);
//
