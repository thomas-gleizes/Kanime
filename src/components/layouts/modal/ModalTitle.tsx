import React, { FC, HTMLAttributes } from 'react';
import classnames from 'classnames';

const ModalTitle: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <h2 className={classnames('modal-title', className)} {...props} />;
};

export default ModalTitle;
