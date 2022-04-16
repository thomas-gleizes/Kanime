import React, { useMemo } from 'react';
import classnames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TailwindcssColors;
  outline?: boolean;
}

const Button: Component<ButtonProps> = ({ color, className, outline, ...rest }) => {
  const customColor = useMemo<string>(() => {
    if (outline)
      return `hover:text-white border-[2.8px] bg-gray-100 border-${color}-500 text-${color}-500 hover:bg-${color}-500 rounded-md`;
    else
      return `text-white bg-${color}-500 hover:bg-${color}-600 focus:ring ring-offset-2 ring-${color}-600 rounded-sm`;
  }, [color, outline]);

  return (
    <button
      className={classnames(
        customColor,
        className,
        'shadow-lg hover:shadow-xl focus:shadow-sm select-none w-full text-lg font-bold transition'
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
