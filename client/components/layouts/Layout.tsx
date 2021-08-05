import React, { FC, HTMLAttributes } from "react";

const Layout: FC<HTMLAttributes<HTMLElement>> = (props) => {
  return <main {...props} />;
};

export default Layout;
