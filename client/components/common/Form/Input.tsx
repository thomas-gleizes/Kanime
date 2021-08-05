import React, { FC, InputHTMLAttributes } from "react";
import classnames from "classnames";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return <input className={classnames("", className)} {...props} />;
};

export default Input;
