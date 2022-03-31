import Error from 'next/error';

import { Page, ServerSideProps } from 'app/next';
import Security from 'services/security.service';
import ssrHandler from 'services/handler.service';
import { withSessionSsr } from 'services/session.service';
import { SsrError } from 'class/error';
import EmptyLayout from 'components/layouts/pages/EmptyLayout';

type Props = { message: string } & {
  error?: ErrorPage;
};

export const getServerSideProps: ServerSideProps<Props> = ssrHandler(
  withSessionSsr((context) => {
    if (context.query.hasOwnProperty('error'))
      throw new SsrError('This is an error', 404);

    if (!Security.verifyToken(context.req.session.token))
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };

    return {
      props: {
        message: 'ssr page rendering with success with handler',
      },
    };
  })
);

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
