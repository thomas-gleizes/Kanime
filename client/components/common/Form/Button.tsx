import React from "react";
import classnames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string | "gray" | "red" | "yellow" | "green" | "blue" | "indigo" | "purple" | "pink";
}

const Button: React.FC<ButtonProps> = ({ color, className, ...rest }) => {
  const customColor =
    color !== "primary" ? `bg-${color}-500 hover:bg-${color}-600 ring-${color}-600` : "";

  return (
    <button
      className={classnames(
        customColor,
        className,
        "shadow-lg select-none text-lg mx-2 font-bold rounded transition duration-150 outline-none text-white focus:ring ring-offset-2"
      )}
      {...rest}
    />
  );
};

Button.defaultProps = {
  color: "blue",
  className: "px-4 py-1.5",
};

export default Button;
