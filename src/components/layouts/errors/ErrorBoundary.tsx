import { SsrException } from 'exceptions';
import Error from 'next/error';
import React from 'react';

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
