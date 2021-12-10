import React from 'react';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const Footer: React.FunctionComponent<Props> = (props) => {
  return <footer {...props} />;
};

export default Footer;
