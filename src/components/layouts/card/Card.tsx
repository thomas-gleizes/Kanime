import React, { HTMLAttributes } from "react";
import classnames from "classnames";

const Card: React.FC<HTMLAttributes<HTMLElement>> = ({ className, ...rest }) => {
  return <div className={classnames("card", className)} {...rest} />;
};

export default Card;
