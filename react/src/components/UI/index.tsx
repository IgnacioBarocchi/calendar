import { ButtonProps, TextProps } from './@types';
import {
  DropdownHeader,
  DropdownItem,
  DropdownList,
  DropdownWrapper,
  Pressable,
} from './DumbComponents';
import { FC, MouseEvent, useState } from 'react';
import { FaAngleDown, FaWindowClose } from 'react-icons/fa';

import { ModalId } from '../Modal';
import pressableInterceptor from '../../lib/pressable';
import styled from 'styled-components';
import theme from '../../constants/theme';

export const Text = styled.span<TextProps>`
  color: ${({ theme, brand }) =>
    theme.palette.foreground[brand ? 'brand' : 'primary']};
  font-size: ${({ theme, size }) => theme.size.text[size ?? 'l']};
  font-weight: ${({ weight }) => weight ?? 'regular'};
`;

export const Button: FC<ButtonProps> = (props) => {
  const { onClick, linkTo, label, Icon, border, size } = props;

  return (
    <Pressable
      as={linkTo ? 'a' : 'button'}
      type="button"
      onClick={(event: MouseEvent) => {
        if (linkTo) return;
        pressableInterceptor(event, onClick);
      }}
      border={border || false}
      href={linkTo ?? ''}
    >
      {Icon && label ? (
        <>
          <Text {...props}> {label + ''}</Text>
          <Icon
            style={{ marginLeft: '8px' }}
            size={theme.dark.size.text[size ?? 'l']}
          />
        </>
      ) : Icon ? (
        <Icon size={theme.dark.size.text[size ?? 'l']} />
      ) : (
        <Text {...props}> {label + ''}</Text>
      )}
    </Pressable>
  );
};

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
  position: absolute;
  background: ${({ theme }) => theme.palette.background.secondary};
  color: ${({ theme }) => theme.palette.foreground.primary};
  border: 1px solid ${({ theme }) => theme.palette.foreground.secondary};
  margin: 0;
  padding: 0;
  width: 35vw;
  // border-radius: 4px;
`;

const DialogHeaderContainer = styled.div.attrs(({ className }) => ({
  className: className || 'draggable-header',
}))`
  height: 24px;
  cursor: move;
  display: flex;
  align-items: center;
`;

export const DialogHeader: FC<{ modalId: ModalId; close: () => void }> = ({
  modalId,
  close,
}) => {
  return (
    <DialogHeaderContainer>
      <Button onClick={close} Icon={FaWindowClose} size="s" />
      <Text size="s">{`Event ${modalId}`}</Text>
    </DialogHeaderContainer>
  );
};

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
