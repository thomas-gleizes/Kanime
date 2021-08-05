import React, { FC, HTMLAttributes } from "react";

import Footer from "./Footer";

const Layout: FC<HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <>
      <main style={{ marginTop: "56px" }}>
        <div {...props} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
