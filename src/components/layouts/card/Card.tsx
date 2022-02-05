import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

const Card: React.FC<HTMLAttributes<HTMLElement>> = ({ className, ...rest }) => {
  return (
    <div
      className={classnames(
        'mb-8 shadow-lg border border-gray-300 relative flex flex-col bg-white rounded',
        className
      )}
      {...rest}
    />
  );
};

export default Card;
