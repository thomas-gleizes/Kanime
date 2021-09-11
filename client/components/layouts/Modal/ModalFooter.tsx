import React, { FC, HTMLAttributes } from "react";
import classnames from "classnames";

const ModalFooter: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return <div className={classnames("bg-gray-100 w-full p-2", className)} {...rest} />;
};

export default ModalFooter;
