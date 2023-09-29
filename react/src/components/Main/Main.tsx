import { FC } from 'react';
import { MainContainer } from './MainElements';

const Main: FC<{ children: JSX.Element[] }> = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};

export default Main;
