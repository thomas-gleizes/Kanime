import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

const CardBody: React.FC<HTMLAttributes<HTMLElement>> = ({ className, ...rest }) => {
  return <div className={classnames('flex min-h-50 px-2 py-4', className)} {...rest} />;
};

export default CardBody;
