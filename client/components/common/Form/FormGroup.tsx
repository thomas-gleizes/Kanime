import React, { FC, HTMLAttributes } from "react";
import classnames from "classnames";

const FormGroup: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={classnames("flex justify-between my-1 px-2", className)}
      {...props}
    />
  );
};

export default FormGroup;
