import React, { FC, HTMLAttributes } from "react";
import classnames from "classnames";

const ModalFooter: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return <div className={classnames("modal-footer", className)} {...rest} />;
};

export default ModalFooter;
