import React, { useMemo } from 'react';
import classnames from 'classnames';

import { InputType, Size, TailwindcssColors } from '@types';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: InputType;
  iSize?: Size;
  valid?: boolean;
  invalid?: boolean;
  color?: TailwindcssColors;
}

const Input: React.FunctionComponent<InputProps> = ({
  type,
  color,
  className,
  disabled,
  iSize: size,
  invalid,
  valid,
  ...rest
}) => {
  const Tag = useMemo<React.ElementType>(() => {
    switch (type) {
      case 'select':
        return 'select';
      default:
        return 'input';
    }
  }, [type]);

  const classType = useMemo<string>(() => {
    switch (type) {
      case 'select':
        return 'tw-select w-full bg-white border border-gray-300 rounded';
      case 'textarea':
        return 'w-full border border-gray-300 rounded';
      case 'checkbox':
        return 'form-checkbox h-5 w-5 mx-1';
      default:
        return 'w-full border rounded';
    }
  }, [type]);

  const classSize = useMemo<string>(() => {
    switch (size) {
      case 'xs':
        return 'px-1 py-0.5 text-xs leading-3';
      case 'sm':
        return 'px-1.5 py-1 text-sm leading-4';
      case 'lg':
        return 'px-3 py-2 text-lg leading-6';
      case 'xl':
        return 'px-4 py-3 text-xl leading-8';
      default:
        return 'px-2 py-1.5 text-md leading-2';
    }
  }, [size]);

  const classColor = useMemo<string>(() => {
    if (disabled) return 'disabled:bg-gray-100 border-gray-300';
    else if (invalid) return 'border-danger input-invalid';
    else if (valid) return 'border-success input-valid';
    return `hover:border-${color}-300 focus:border-${color}-500 `;
  }, [color, invalid, valid]);

  return (
    <Tag
      type={type}
      className={classnames(
        classType,
        classColor,
        classSize,
        'appearance-none',
        className
      )}
      disabled={disabled}
      {...rest}
    />
  );
};

Input.defaultProps = {
  type: 'text',
  color: 'blue',
  iSize: 'md',
};

export default Input;
