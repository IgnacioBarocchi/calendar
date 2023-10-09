import { FontValues } from '../../../constants/theme';
import { IconType } from 'react-icons';
import { MouseEventHandler } from 'react';

export interface TextProps {
  size?: 'l' | 'm' | 's';
  weight?: 'bold' | 'regular';
  brand?: boolean;
  fade?: boolean;
  font?: FontValues;
}

export interface PressableContentProps extends TextProps {
  label?: string | boolean | number;
  Icon?: IconType;
  safeSpace?: boolean;
  reversed?: boolean;
  border?: boolean;
}

export interface ButtonProps extends PressableContentProps {
  onClick: MouseEventHandler;
}

export interface LinkProps extends Omit<ButtonProps, 'onClick'> {
  to: string;
}
