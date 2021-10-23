import React, { FC, HTMLAttributes } from "react";
import classnames from "classnames";

const ModalBody: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={classnames("modal-body", className)} {...props} />;
};

export default ModalBody;
