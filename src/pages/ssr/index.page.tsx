import Error from 'next/error';

import { Page } from 'next/app';
import { ssrHandler } from 'services/handler.service';
import EmptyLayout from 'components/layouts/pages/EmptyLayout';
import ssrError from 'class/error/SsrError';

type Props = { message: string } & {
  error?: ErrorPage;
};

export const getServerSideProps = ssrHandler<Props, { error?: string }>((context) => {
  if (context.query.hasOwnProperty('error')) throw new ssrError(400, 'ssr handler error');

  const name = context.req.session?.user?.username || 'anonymous';

  return {
    props: {
      message: `Hello, ${name}`,
    },
  };
});

const Page: Page<Props> = ({ message, error }) => {
  if (error) return <Error statusCode={error.statusCode} title={error.message} />;

  return (
    <div>
      <h1 className="text-xl text-center">{message}</h1>
    </div>
  );
};

Page.layout = EmptyLayout;

export default Page;
