// todo: rename this component.
// todo:q? move nav to another component, pass props & react.memo props to avoid rerendering
import { FC, memo } from 'react';
import { MonthLabel, NavContainer } from './WeekViewNavigationBarElements';

import Nav from '../Nav';

const WeekViewNavigationBar: FC<{ gridArea: string; month: string }> = memo(
  ({ gridArea, month }) => {
    return (
      <NavContainer gridArea={gridArea}>
        <Nav />
        <MonthLabel size="l" weight="bold">
          {month}
        </MonthLabel>
      </NavContainer>
    );
  },
  (oldProps, nextProps) => oldProps.month === nextProps.month,
);

export default WeekViewNavigationBar;
