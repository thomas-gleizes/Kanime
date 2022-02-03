import React, { useMemo } from 'react';
import classnames from 'classnames';

import { TailwindcssColors } from '@types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TailwindcssColors;
  outline: boolean;
}

const Button: React.FC<ButtonProps> = ({ color, className, outline, ...rest }) => {
  const customColor = useMemo<string>(() => {
    if (outline)
      return `text-black hover:text-white border-4 bg-gray-50 border-${color}-400 hover:bg-${color}-500`;
    else
      return `text-white bg-${color}-500 hover:bg-${color}-600 focus:ring ring-offset-2 ring-${color}-600`;
  }, [color, outline]);

  return (
    <button
      className={classnames(
        customColor,
        className,
        'shadow-lg select-none w-full text-lg font-bold rounded-lg transition transform duration-150 outline-none text-white'
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
};

export default Button;
