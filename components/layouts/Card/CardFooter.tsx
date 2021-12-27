import React, { HTMLAttributes } from "react";
import classnames from "classnames";

const CardFooter: React.FC<HTMLAttributes<HTMLElement>> = ({ className, ...rest }) => {
  return <div className={classnames("card-footer", className)} {...rest} />;
};

export default CardFooter;
