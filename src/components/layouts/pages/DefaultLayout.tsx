import React from 'react';

import { LayoutProps } from 'app/types';
import ErrorBoundary from 'components/layouts/errors/ErrorBoundary';

interface Props extends Omit<LayoutProps, 'pageProps'> {}

const DefaultLayout: Component<Props> = ({ children, exception }) => {
  return (
    <ErrorBoundary exception={exception}>
      <main className="dark:bg-gray-800"> {children}</main>
    </ErrorBoundary>
  );
};

export default DefaultLayout;
