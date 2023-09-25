import { AsideContainer } from './AsideElements';
import { FC } from 'react';

const Aside: FC<{ gridArea: string }> = ({ gridArea }) => {
  return <AsideContainer gridArea={gridArea}></AsideContainer>;
};

export default Aside;
