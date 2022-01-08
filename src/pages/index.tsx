import type { GetStaticProps, NextPage } from 'next';
import Moment from 'moment';

import Content from '@layouts/Content';
import Title from '@layouts/Title';

interface Props {
  time: string;
}

export const getStaticProps: GetStaticProps<Props> = () => {
  return { props: { time: Moment().format('DD/MM/YYYY HH:mm:ss') }, revalidate: 60 };
};

const Home: NextPage<Props> = ({ time }) => {
  return (
    <Content>
      <Title>Accueil</Title>
      <div className="flex flex-col-2 items-center justify-center h-[80vh] py-2">
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="text-center">{time}</div>
          <h1 className="text-6xl font-bold first-letter:text-[#db8000]">
            Welcome to{' '}
            <a className="text-blue-600" href="https://nextjs.org">
              {process.env.NEXT_PUBLIC_APP_NAME}!
            </a>
          </h1>

          <p className="mt-3 text-2xl">
            Get started by editing{' '}
            <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
              pages/index.ts
            </code>
          </p>

          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <a
              href="https://nextjs.org/docs"
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
              <p className="mt-4 text-xl">
                Find in-depth information about Next.js features and API.
              </p>
            </a>

            <a
              href="https://nextjs.org/learn"
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Learn &rarr;</h3>
              <p className="mt-4 text-xl">
                Learn about Next.js in an interactive course with quizzes!
              </p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Examples &rarr;</h3>
              <p className="mt-4 text-xl">
                Discover and deploy boilerplate example Next.js projects.
              </p>
            </a>

            <a
              href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
              <p className="mt-4 text-xl">
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Home;
