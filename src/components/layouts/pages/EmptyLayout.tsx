import React from 'react';

import { LayoutProps } from 'app/types';
import ErrorBoundary from 'components/layouts/errors/ErrorBoundary';

interface Props extends LayoutProps {}

const EmptyLayout: Component<Props> = ({ children, exception }) => {
  return (
    <ErrorBoundary exception={exception}>
      <main>{children}</main>
    </ErrorBoundary>
  );
};

export default EmptyLayout;
