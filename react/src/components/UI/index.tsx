import { FC } from 'react';
import { HEADER_HEIGHT } from '../../constants/theme';
import { ModalId } from '../Modal';
import styled from 'styled-components';

export const TodayCircle = styled.div`
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
`;

export const Button = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.primary};
  font-size: 2rem;
`;

export const CalendarCell = styled.div`
  color: ${({ theme }) => theme.primary};
  border: ${({ theme }) => '1px solid' + theme.tertiary};
  background: ${({ theme }) => theme.bgPrimary};
  text-align: center;
  height: cal(${HEADER_HEIGHT} / 2);
  &first-child: {
    background: ${({ theme }) => `
      linear-gradient(${theme.primary}, ${theme.primary}) 50% 50% / calc(100% - 2px)
      calc(100% - 2px) no-repeat,
      linear-gradient(90deg, transparent 0%, ${theme.tertiary} 100%);
      border: none;
    `};
  }
`;

export const TextBig = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 2rem;
`;

export const Dialog = styled.dialog`
  z-index: 5;
  position: relative;
  background: ${({ theme }) => theme.bgSecondary};
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.secondary};
  margin: 0;
  padding: 0;
  border-radius: 4px;
  width: 35vw;
`;

const DialogHeaderContainer = styled.div.attrs(({ className }) => ({
  className: className || 'header',
}))`
  height: 20px;
  cursor: drag;
`;

export const DialogHeader: FC<{ modalId: ModalId; close }> = ({
  modalId,
  close,
}) => {
  return (
    <DialogHeaderContainer>
      <Button onClick={close}>close</Button>
    </DialogHeaderContainer>
  );
};

export const MonthViewItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: ${({ theme }) => theme.primary};
`;
