import React from 'react';
import classnames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?:
    | string
    | 'secondary'
    | 'primary'
    | 'gray'
    | 'red'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'pink';
}

const Button: React.FC<ButtonProps> = ({ color, className, ...rest }) => {
  const customColor = !['primary', 'secondary'].includes(color)
    ? `bg-${color}-500 hover:bg-${color}-600 ring-${color}-600`
    : `bg-${color}`;

  return (
    <button
      className={classnames(
        customColor,
        className,
        'shadow-lg select-none text-lg mx-2 font-bold rounded transition transform hover:scale-105 duration-150 outline-none text-white focus:ring ring-offset-2'
      )}
      {...rest}
    />
  );
};

Button.defaultProps = {
  color: 'blue',
  className: 'px-4 py-1.5',
  type: 'button',
};

export default Button;
