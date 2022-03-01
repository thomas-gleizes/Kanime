import React from 'react';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const Footer: Component<Props> = (props) => {
  return <footer {...props} />;
};

export default Footer;
