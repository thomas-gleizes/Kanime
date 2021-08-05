import React, { HTMLAttributes } from "react";

const CardFooter: React.FC<HTMLAttributes<HTMLElement>> = ({
  className,
  ...rest
}) => {
  return (
    <div
      className={`bg-gray-200 rounded-b-lg w-full p-2 ${className}`}
      {...rest}
    />
  );
};

export default CardFooter;
