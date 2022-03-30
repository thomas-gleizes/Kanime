import Error from 'next/error';

import { Page, ServerSideProps } from 'app/next';
import ssrHandler from 'services/handler.service';
import { SsrError } from 'class/error';
import { withSessionSsr } from 'services/session.service';

type Props = { name: string } & {
  error?: ErrorPage;
};

export const getServerSideProps: ServerSideProps<Props> = ssrHandler(
  withSessionSsr((context) => {
    if (context.query.hasOwnProperty('error'))
      throw new SsrError('This is an error', 404);

    return {
      props: {
        name: 'ok',
      },
    };
  })
);

const Page: Page<Props> = ({ name, ...props }) => {
  if (props.hasOwnProperty('error'))
    return <Error statusCode={props.error.statusCode} title={props.error.message} />;

  return (
    <div>
      <h1 className="text-xl text-center">{name}</h1>
    </div>
  );
};

export default Page;
