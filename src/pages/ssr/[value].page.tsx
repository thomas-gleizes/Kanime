import { Page } from 'app/next';
import { ssrHandler } from 'services/handler.service';
import { SsrException } from 'exceptions';
import { useHideHeader } from 'hooks';
import EmptyLayout from 'components/layouts/pages/EmptyLayout';

type Props = { name: string };

export const getServerSideProps = ssrHandler<Props, { error?: string }>((context) => {
  if (context.query.hasOwnProperty('error'))
    throw new SsrException(400, 'This is an exceptions');

  return {
    props: {
      name: `${context.query.value}`,
    },
  };
});

const Page: Page<Props> = ({ name }) => {
  useHideHeader();

  return (
    <div>
      <h1 className="text-xl text-center"> Hello {name}</h1>
    </div>
  );
};

Page.layout = EmptyLayout;

export default Page;
