import React, { FC, HTMLAttributes } from "react";

const Layout: FC<HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <>
      <main style={{ paddingTop: "56px", minHeight: "100vh" }}>
        <div {...props} />
      </main>
    </>
  );
};

export default Layout;
