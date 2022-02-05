import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

const CardFooter: React.FC<HTMLAttributes<HTMLElement>> = ({ className, ...rest }) => {
  return (
    <div
      className={classnames(
        'rounded-b bg-gray-100 px-4 py-2 border-t border-gray-300',
        className
      )}
      {...rest}
    />
  );
};

export default CardFooter;
