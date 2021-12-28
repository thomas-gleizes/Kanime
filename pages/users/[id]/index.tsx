import { GetServerSideProps, NextPage } from 'next';
import Error from 'next/error';
import Image from 'next/image';
import React from 'react';

import { User } from '@types';
import { withSessionSsr } from '@services/session';
import { UserModel } from '@models';
import { UsersResources } from '@resources';
import EditUserModal from '@components/modal/EditUserModal';
import Title from '@layouts/Title';

interface Props {
  user?: User;
  isCurrent?: boolean;
  error?: any;
}

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async ({ query, req }) => {
    const { id } = query;
    const { user: sessionUser } = req.session;

    const [user] = UsersResources.one(await UserModel.findById(+id));

    if (user) {
      return {
        props: {
          user,
          isCurrent: user.id === sessionUser?.id,
        },
      };
    } else {
      return {
        props: {
          error: {
            code: 404,
            message: 'user not found',
          },
        },
      };
    }
  }
);

export const Home: NextPage<Props> = ({ user, isCurrent, error }) => {
  if (error) return <Error statusCode={error.code} title={error.message} />;

  return (
    <div>
      <Title>{user.login}</Title>
      <div className="w-full">
        <div
          className="bg-center bg-no-repeat bg-cover bg-clip-padding bg-primary"
          style={{ backgroundImage: `url('${user.backgroundPath}')` }}
        >
          <div className="flex pt-32 px-20 pb-10 select-none">
            <Image
              className="rounded-full border-2 border-white"
              src={user.avatarPath}
              width={100}
              height={100}
              alt="big avatar"
            />
            <div className="mt-3 ml-2 select-none">
              <h2 className="text-2xl"> {user.login} </h2>
              {process.browser && isCurrent ? <EditUserModal /> : null}
            </div>
          </div>
        </div>
        <div className="text-center mt-5"> Coming soon...</div>
      </div>
    </div>
  );
};

export default Home;
