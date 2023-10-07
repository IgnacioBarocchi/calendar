import { IconType } from 'react-icons';
import { MouseEventHandler } from 'react';

export interface TextProps {
  size?: 'l' | 'm' | 's';
  weight?: 'bold' | 'regular';
  brand?: boolean;
  fade?: boolean;
}

export interface PressableContentProps extends TextProps {
  label?: string | boolean | number;
  Icon?: IconType;
}

export interface ButtonProps extends PressableContentProps {
  onClick: MouseEventHandler;
  border?: boolean;
  reversed?: boolean;
}

export interface LinkProps extends Omit<ButtonProps, 'onClick'> {
  to: string;
}
