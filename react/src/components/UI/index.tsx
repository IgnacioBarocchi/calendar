import { ButtonProps, TextProps } from './@types';
import { FC, MouseEvent, useState } from 'react';
import { FaAngleDown, FaWindowClose } from 'react-icons/fa';

import { ModalId } from '../Modal';
import { Pressable } from './DumbComponents';
import pressableInterceptor from '../../lib/pressable';
import styled from 'styled-components';

export const Text = styled.span<TextProps>`
  color: ${({ theme, brand }) =>
    theme.palette.foreground[brand ? 'brand' : 'primary']};
  font-size: ${({ theme, size }) => theme.size.text[size ?? 'l']};
  font-weight: ${({ weight }) => weight ?? 'regular'};
`;

export const Button: FC<ButtonProps> = (props) => {
  const { onClick, label, Icon, border } = props;

  return (
    <Pressable
      type="button"
      onClick={(event: MouseEvent) => {
        pressableInterceptor(event, onClick);
      }}
      border={border || false}
    >
      {Icon ? <Icon {...props} /> : <Text {...props}> {label + ''}</Text>}
    </Pressable>
  );
};

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
const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownHeader = styled.div`
  cursor: pointer;
  color: white;
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  padding: 0;
  margin: 0;
  list-style: none;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Dropdown: FC<{
  options: string[];
  onSelect: (val: string) => void;
}> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <DropdownWrapper>
      <DropdownHeader onClick={toggleDropdown}>
        Create event
        <FaAngleDown />
        {/* {selectedOption || 'Select an option'} */}
      </DropdownHeader>
      <DropdownList isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownWrapper>
  );
};

export default Dropdown;
