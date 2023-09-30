import { Button } from '../../UI';
import { FC } from 'react';
import { TiPointOfInterestOutline } from 'react-icons/ti';
import styled from 'styled-components';
//styled(Button).attrs(({ className }) => ({}))`
const LogoContainer = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  border-bottom: 1px solid ${({ theme }) => theme.palette.foreground.tertiary};
  display: flex;
`;

const Logo: FC<{ gridArea: string }> = ({ gridArea }) => {
  return (
    <LogoContainer gridArea={gridArea}>
      <Button
        linkTo="https://main--cerulean-gingersnap-166563.netdivfy.app/"
        Icon={TiPointOfInterestOutline}
        label="CLRD"
        size="l"
        weight="bold"
        reversed={true}
      />
    </LogoContainer>
  );
};

export default Logo;
