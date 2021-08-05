import React, { FC, HTMLAttributes } from "react";
import classnames from "classnames";

const ModalTitle: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <h2 className={classnames("text-xl ml-2 mt-1", className)} {...props} />
  );
};

export default ModalTitle;
