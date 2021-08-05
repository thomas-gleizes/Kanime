import React, { HTMLAttributes } from "react";

const CardHeader: React.FC<HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={"bg-gray-100 shadow rounded-t-lg w-full p-2" + className}
      {...props}
    />
  );
};

export default CardHeader;
