import Error from 'next/error';

import { Page } from 'next/app';
import { SsrException } from 'exceptions';
import { ssrHandler } from 'services/handler.service';
import EmptyLayout from 'components/layouts/pages/EmptyLayout';

type Props = { message: string } & {
  error?: ErrorPage;
};

export const getServerSideProps = ssrHandler<Props, { error?: string }>((context) => {
  if (context.query.hasOwnProperty('error'))
    throw new SsrException(400, 'ssr handler exceptions');

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
