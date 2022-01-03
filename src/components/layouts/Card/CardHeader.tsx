import React, { HTMLAttributes } from "react";
import classnames from "classnames";

const CardHeader: React.FC<HTMLAttributes<HTMLElement>> = ({ className, ...rest }) => {
  return <div className={classnames("card-header", className)} {...rest} />;
};

export default CardHeader;
