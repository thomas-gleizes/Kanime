import Error from 'next/error';

import { Page } from 'next/app';
import { ssrHandler } from 'services/handler.service';
import { SsrError } from 'errors';
import EmptyLayout from 'components/layouts/pages/EmptyLayout';

type Props = { message: string } & {
  error?: ErrorPage;
};

export const getServerSideProps = ssrHandler<Props, { error?: string }>((context) => {
  if (context.query.hasOwnProperty('error')) throw new SsrError(400, 'This is an errors');

  const name = context.query.value;

  return {
    props: {
      message: `Hello, ${name}`,
    },
  };
});

const Page: Page<Props> = ({ message, ...props }) => {
  if (props.hasOwnProperty('error'))
    return <Error statusCode={props.error.statusCode} title={props.error.message} />;

  return (
    <div>
      <h1 className="text-xl text-center">{message}</h1>
    </div>
  );
};

Page.layout = EmptyLayout;

export default Page;
