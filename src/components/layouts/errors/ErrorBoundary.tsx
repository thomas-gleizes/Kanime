import Error from 'next/error';
import React from 'react';

import { SsrException } from 'exceptions';

interface Props {
  exception?: SsrException;
  children: ReactNode;
}

const ErrorBoundary: Component<Props> = ({ exception, children }) => {
  if (exception)
    return <Error statusCode={exception.statusCode} title={exception.message} />;

  return <>{children}</>;
};

export default ErrorBoundary;
