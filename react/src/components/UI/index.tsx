import { FC } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { ModalId } from '../Modal';
import styled from 'styled-components';

export const TodayCircle = styled.div`
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.foreground.primary};
`;

export const Button = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.palette.foreground.primary};
  font-size: 2rem;
`;

const CloseButtonContainer = styled(Button)`
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.palette.foreground.primary};
  padding: 0;
  font-size: auto;
`;

const CloseButtonIcon = styled(FaWindowClose)`
  margin: 0;
  padding: 0;
`;

const CloseButton: FC<{ close: () => void }> = ({ close }) => (
  <CloseButtonContainer onClick={close}>
    <CloseButtonIcon size={20} />
  </CloseButtonContainer>
);

export const CalendarCell = styled.div<{
  location: 'header-row' | 'header-column' | 'body';
}>`
  color: ${({ theme }) => theme.palette.foreground.primary};
  border: ${({ theme }) => '1px solid' + theme.palette.foreground.tertiary};
  background: ${({ theme }) => theme.palette.background.primary};
  text-align: center;
  height: calc(${({ theme }) => theme.size.headerHeight} / 2);
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme, location }) =>
    ({
      'header-row': `
        border-top: none;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:first-child {
          border-left: none;
        }
      `,
      'header-column': `
        background: linear-gradient(
          ${theme.palette.background.primary},
          ${theme.palette.background.primary}
        )
        50% 50% / calc(100% - 2px) calc(100% - 2px) no-repeat,
        linear-gradient(90deg, transparent 0%, ${theme.palette.foreground.tertiary} 100%);
        height: 100%;
        border: none;
      `,
      body: `
        &:nth-child(n + 186):nth-child(-n + 192) {
          border-bottom: none;
        }
      `,
    }[location])}
`;

export const Text = styled.span<{
  size?: 'l' | 'm' | 's';
  weight?: 'bold' | 'regular';
  brand?: boolean;
}>`
  color: ${({ theme, brand }) =>
    theme.palette.foreground[brand ? 'brand' : 'primary']};
  font-size: ${({ theme, size }) => theme.size.text[size ?? 'l']};
  font-weight: ${({ weight }) => weight ?? 'regular'};
`;

export const Dialog = styled.dialog`
  z-index: 5;
  position: relative;
  background: ${({ theme }) => theme.palette.background.secondary};
  color: ${({ theme }) => theme.palette.foreground.primary};
  border: 1px solid ${({ theme }) => theme.palette.foreground.secondary};
  margin: 0;
  padding: 0;
  border-radius: 4px;
  width: 35vw;
`;

const DialogHeaderContainer = styled.div.attrs(({ className }) => ({
  className: className || 'draggable-header',
}))`
  height: 24px;
  cursor: move;
`;

export const DialogHeader: FC<{ modalId: ModalId; close: () => void }> = ({
  modalId,
  close,
}) => {
  console.log('show text based on modal id', modalId);

  return (
    <DialogHeaderContainer>
      <CloseButton close={close} />
    </DialogHeaderContainer>
  );
};
