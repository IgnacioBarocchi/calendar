import { IconType } from 'react-icons';
import { MouseEventHandler } from 'react';

export interface TextProps {
  size?: 'l' | 'm' | 's';
  weight?: 'bold' | 'regular';
  brand?: boolean;
}

export interface ButtonProps extends TextProps, IconType {
  onClick: MouseEventHandler;
  label?: string | boolean | number;
  Icon?: IconType;
  border?: boolean;
  linkTo?: string;
}
