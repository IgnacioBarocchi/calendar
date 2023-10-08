import { FC } from 'react';
import { Fonts } from '../../../constants/theme';
import { Link } from '../../UI';
import styled from 'styled-components';
//styled(Button).attrs(({ className }) => ({}))`
// border-bottom: 1px solid ${({ theme }) => theme.palette.foreground.tertiary};

const LogoContainer = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const Logo: FC<{ gridArea: string }> = ({ gridArea }) => {
  return (
    <LogoContainer gridArea={gridArea}>
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
