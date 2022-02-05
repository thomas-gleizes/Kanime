import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

const CardHeader: React.FC<HTMLAttributes<HTMLElement>> = ({ className, ...rest }) => {
  return (
    <div
      className={classnames(
        'px-4 py-2 mb-0 border-b border-gray-300 rounded-t bg-gray-200',
        className
      )}
      {...rest}
    />
  );
};

export default CardHeader;
