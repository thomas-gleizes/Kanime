import React, { useMemo } from 'react';
import classnames from 'classnames';

import { TailwindcssColors } from '@types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TailwindcssColors;
  outline?: boolean;
  gradiant?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  color,
  className,
  outline,
  gradiant,
  ...rest
}) => {
  const customColor = useMemo<string>(() => {
    if (outline)
      return `text-black hover:text-white border-[2.8px] bg-gray-50 border-${color}-500 hover:bg-${color}-500 rounded-md`;
    else
      return `text-white bg-${color}-500 hover:bg-${color}-600 focus:ring ring-offset-2 ring-${color}-600 rounded-sm`;
  }, [color, outline, gradiant]);

  return (
    <button
      className={classnames(
        customColor,
        className,
        'shadow-lg hover:shadow-xl focus:shadow-sm select-none w-full text-lg font-bold transition text-white'
      )}
      {...rest}
    />
  );
};

Button.defaultProps = {
  color: 'blue',
  className: 'py-1',
  type: 'button',
  outline: false,
  gradiant: false,
};

export default Button;
