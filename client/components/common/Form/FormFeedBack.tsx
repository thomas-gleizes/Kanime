import React, { HTMLAttributes } from "react";

const FormFeedBack: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div className="text-danger text-sm ml-1" {...props} />;
};

export default FormFeedBack;
