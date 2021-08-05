import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ required, children, ...props }) => {
  return (
    <label {...props}>
      {children} {required ? <em className="text-primary">*</em> : null}
    </label>
  );
};

export default Label;
