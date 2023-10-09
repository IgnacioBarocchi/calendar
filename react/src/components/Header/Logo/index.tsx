import { Button, Link } from '../../UI';

import { FC } from 'react';
import { Fonts } from '../../../constants/theme';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';
import { updateAsideState } from '../../../store/actions';
import { useDispatch } from 'react-redux';

const LogoContainer = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  /* border-bottom: 1px solid ${({ theme }) =>
    theme.palette.foreground.tertiary}; */
`;

const Logo: FC<{ gridArea: string }> = ({ gridArea }) => {
  const dispatch = useDispatch();
  return (
    <LogoContainer gridArea={gridArea}>
      <Button
        Icon={GiHamburgerMenu}
        onClick={() => dispatch(updateAsideState())}
      />
      <Link
        to="https://main--cerulean-gingersnap-166563.netdivfy.app/"
        label="Calendar."
        size="l"
        weight="bold"
        font={Fonts.TechnorBlack}
      />
    </LogoContainer>
  );
};

export default Logo;
