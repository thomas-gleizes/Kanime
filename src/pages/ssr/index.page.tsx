import { Page } from 'app/next';
import { SsrException } from 'exceptions';
import { ssrHandler } from 'services/handler.service';
import { useHideHeader } from 'hooks';
import EmptyLayout from 'components/layouts/pages/EmptyLayout';

interface Props {
  message: string;
}

export const getServerSideProps = ssrHandler<Props, { error?: string }>(
  async (context) => {
    if (context.query.hasOwnProperty('error'))
      throw new SsrException(400, 'ssr handler exceptions');

    const name = context.req.session?.user?.username || 'anonymous';

    return {
      props: {
        message: `Hello, ${name}`,
      },
    };
  }
);

const Page: Page<Props> = ({ message }) => {
  useHideHeader();

  return (
    <div>
      <h1 className="text-xl text-center">{message}</h1>
    </div>
  );
};

Page.layout = EmptyLayout;

export default Page;
