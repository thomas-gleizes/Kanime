import React, { FC, HTMLAttributes } from 'react';
import classnames from 'classnames';

const ModalFooter: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return <div className={classnames('w-full', className)} {...rest} />;
};

ModalFooter.defaultProps = {
  className: 'bg-gray-100 p-2',
};

export default ModalFooter;
