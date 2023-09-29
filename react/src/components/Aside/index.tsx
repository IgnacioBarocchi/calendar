import { AsideContainer, AsideContentWrapper } from './AsideElements';

import { FC } from 'react';
import MonthView from '../MonthView';

const Aside: FC<{ gridArea: string }> = ({ gridArea }) => {
  return (
    <AsideContainer gridArea={gridArea}>
      <AsideContentWrapper>
        <MonthView />
      </AsideContentWrapper>
    </AsideContainer>
  );
};

export default Aside;
