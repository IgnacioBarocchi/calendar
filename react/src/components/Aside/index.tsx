import { AsideContainer } from './AsideElements';
import { FC } from 'react';
import MonthView from '../MonthView';

const Aside: FC<{ gridArea: string }> = ({ gridArea }) => {
  return (
    <AsideContainer gridArea={gridArea}>
      <MonthView />
    </AsideContainer>
  );
};

export default Aside;
