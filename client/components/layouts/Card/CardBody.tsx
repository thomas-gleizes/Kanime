import React, { HTMLAttributes } from "react";

const CardBody: React.FC<HTMLAttributes<HTMLElement>> = (props) => {
  return <div {...props} />;
};

CardBody.defaultProps = {
  className: "p-2",
};

export default CardBody;
