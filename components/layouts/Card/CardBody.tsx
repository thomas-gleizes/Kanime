import React, { HTMLAttributes } from "react";
import classnames from "classnames";

const CardBody: React.FC<HTMLAttributes<HTMLElement>> = ({ className, ...rest }) => {
  return <div className={classnames("card-body", className)} {...rest} />;
};

export default CardBody;
