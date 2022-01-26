import React from 'react';
import classnames from 'classnames';

import { TailwindcssColors } from '../../../types/global';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TailwindcssColors;
}

const Button: React.FC<ButtonProps> = ({ color, className, ...rest }) => {
  const customColor = `bg-${color}-500 hover:bg-${color}-600 ring-${color}-600`;

  return (
    <button
      className={classnames(
        customColor,
        className,
        'shadow-lg select-none py-1 text-lg font-bold rounded transition transform duration-150 outline-none text-white focus:ring ring-offset-2'
      )}
      {...rest}
    />
  );
};

Button.defaultProps = {
  color: 'blue',
  className: 'w-full',
  type: 'button',
};

export default Button;
