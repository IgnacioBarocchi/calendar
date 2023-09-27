import { AsideContainer } from './AsideElements';
import { Button } from '../UI';
import { FC } from 'react';
import MonthView from '../MonthView';

const Aside: FC<{ gridArea: string }> = ({ gridArea }) => {
  return (
    <AsideContainer gridArea={gridArea}>
      <Button>x</Button>
      <MonthView />
    </AsideContainer>
  );
};

export default Aside;
