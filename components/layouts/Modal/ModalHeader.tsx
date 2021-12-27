import React, { FC, HTMLAttributes } from "react";
import classnames from "classnames";

const ModalHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return <div className={classnames("modal-header", className)} {...rest} />;
};

export default ModalHeader;
