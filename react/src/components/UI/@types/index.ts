import { ButtonHTMLAttributes, MouseEventHandler } from 'react';

import { IconType } from 'react-icons';

export interface TextProps {
  size?: 'l' | 'm' | 's';
  weight?: 'bold' | 'regular';
  brand?: boolean;
}

export interface ButtonProps
  extends TextProps,
    IconType,
    ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: MouseEventHandler;
  label?: string | boolean | number;
  Icon?: IconType;
  border?: boolean;
  reversed?: boolean;
  linkTo?: string;
}
