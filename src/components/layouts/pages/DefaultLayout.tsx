import React from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const DefaultLayout: Component<Props> = ({ children }) => {
  return (
    <>
      <main className="dark:bg-gray-800"> {children}</main>
    </>
  );
};

DefaultLayout.defaultProps = {
  className: 'mt-header',
};

export default DefaultLayout;
