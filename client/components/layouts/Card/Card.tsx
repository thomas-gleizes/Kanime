import React, { HTMLAttributes } from "react";

const Card: React.FC<HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={`bg-white shadow-lg border-lg${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Card;
