import {
  ButtonProps,
  LinkProps,
  PressableContentProps,
  TextProps,
} from './@types';
import { DropdownList, DropdownWrapper, Pressable } from './DumbComponents';
import { FC, MouseEvent, memo, useState } from 'react';
import { FaAngleDown, FaWindowClose } from 'react-icons/fa';
import { Fonts, desktopGeneric } from '../../constants/theme';
import styled, { css, keyframes } from 'styled-components';

import { ModalId } from '../Modal';
import { nanoid } from 'nanoid';
import pressableInterceptor from '../../lib/pressable';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
export const Text = styled.span<TextProps>`
  color: ${({ theme, brand }) =>
    theme.palette.foreground[brand ? 'brand' : 'primary']};
  font-size: ${({ theme, size }) => theme.size.text[size ?? 'l']};
  font-weight: ${({ weight }) => weight ?? 'regular'};
  font-family: ${({ font }) => (font ? font : 'auto')};
  ${({ fade }) =>
    fade
      ? css`
          animation: ${fadeIn} 500ms ease-in;
        `
      : ''}
`;

const PressableContent: FC<PressableContentProps> = ({
  label,
  font,
  Icon,
  size,
}) => {
  if (!Icon)
    return (
      <Text size={size} font={font}>
        {label + ''}
      </Text>
    );

  const selected: 'l' | 'm' | 's' = size ?? 'l';
  const sizeValue = desktopGeneric.size.text[selected];

  if (Icon && label) {
    return (
      <>
        <Text size={size} font={font}>
          {' '}
          {label + ''}
        </Text>
        <Icon style={{ marginLeft: '8px' }} size={sizeValue} />
      </>
    );
  }

  if (Icon) return <Icon size={sizeValue} />;

  return (
    <Text size={size} font={font}>
      {label + ''}
    </Text>
  );
};

export const Button: FC<ButtonProps> = memo(
  (props) => {
    const { onClick, label, Icon, border, size, reversed, font, safeSpace } =
      props;

    return (
      <Pressable
        as="button"
        type="button"
        reversed={reversed || false}
        onClick={(event: MouseEvent) => {
          pressableInterceptor(event, onClick);
        }}
        /*If you used to conditionally omit it with 
      border={condition && value}, 
      pass border={condition ? value : undefined} instead.*/

        border={border ? border : undefined}
        safeSpace={safeSpace ? safeSpace : undefined}
      >
        <PressableContent
          label={label}
          Icon={Icon}
          size={size}
          font={Fonts.SupremeBold}
        />
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.label === nextProps.label;
  },
);

export const Link: FC<LinkProps> = (props) => {
  const { to, label, Icon, border, size, reversed, font } = props;

  return (
    <Pressable
      as="a"
      reversed={reversed || false}
      border={border ? border : undefined}
      href={to}
    >
      <PressableContent label={label} Icon={Icon} size={size} font={font} />
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
        /* border-top: none;*/
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        /* border-left: none;*/
        background: linear-gradient(
          ${theme.palette.background.primary},
          ${theme.palette.background.primary}
        )
        50% 50% / calc(100% - 2px) calc(100% - 2px) no-repeat,
        linear-gradient(180deg, transparent 0%, ${theme.palette.foreground.tertiary} 100%);
        border:none;
        
        &:first-child {
          background: linear-gradient(
            ${theme.palette.background.primary},
            ${theme.palette.background.primary}
          )
          50% 50% / calc(100% - 2px) calc(100% - 2px) no-repeat,
          linear-gradient(90deg, transparent 0%, ${theme.palette.foreground.tertiary} 100%);
          border:none;
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
       border-bottom: none;
       border-left: none;
       position: relative;
      `,
    }[location])}
`;

export const Dialog = styled.dialog`
  z-index: 5;
  position: absolute;
  background: ${({ theme }) => theme.palette.background.primary};
  color: ${({ theme }) => theme.palette.foreground.primary};
  border: 1px solid ${({ theme }) => theme.palette.foreground.secondary};
  margin: 0;
  padding: 0;
  width: 35vw;
  height: ${({ theme }) => theme.size.headerHeight};
  background: red;
  opacity: 0.5;
`;

const DialogHeaderContainer = styled.div.attrs(({ className }) => ({
  className: className || 'draggable-header',
}))`
  height: 24px;
  cursor: move;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.foreground.secondary};
`;

export const DialogHeader: FC<{
  modalId: ModalId;
  close: () => void;
  dialog: HTMLDialogElement | null;
}> = ({ modalId, dialog, close }) => {
  return (
    <DialogHeaderContainer>
      <Button
        onClick={() => {
          alert(dialog);
          dialog?.close();
          close();
        }}
        Icon={FaWindowClose}
        size="s"
      />
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
      <Button
        onClick={toggleDropdown}
        Icon={FaAngleDown}
        label={'Create'}
        size="m"
      />

      <DropdownList isOpen={isOpen}>
        {options.map((option) => (
          <li key={nanoid()} style={{ marginBottom: '8px' }}>
            <Button
              onClick={() => handleOptionClick(option)}
              label={option}
              border={true}
              size="m"
            />
          </li>
        ))}
      </DropdownList>
    </DropdownWrapper>
  );
};

export default Dropdown;
