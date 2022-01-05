import { GetServerSideProps, NextPage } from 'next';
import Error from 'next/error';
import Image from 'next/image';
import React, { useEffect } from 'react';

import { User } from '@types';
import { UserModel } from '@models';
import { withSessionSsr } from '@services/session';
import { useLayoutContext } from '@context/layout';
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

export const UserPage: NextPage<Props> = ({ user, isCurrent, error }) => {
  const {
    headerTransparentState: [headerTransparent, setHeaderTransparent],
    scrollPercent,
  } = useLayoutContext();

  useEffect(() => {
    const boolean: boolean = scrollPercent < 10;
    if (headerTransparent !== boolean) setHeaderTransparent(boolean);
  }, [scrollPercent]);

  useEffect(() => {
    return () => setHeaderTransparent(false);
  }, []);

  if (error) return <Error statusCode={error.code} title={error.message} />;

  return (
    <div>
      <Title>{user.login}</Title>
      <div className="w-full">
        <div
          className="relative bg-center mt-[-56px] h-400 bg-no-repeat bg-cover bg-clip-padding bg-primary"
          style={{ backgroundImage: `url('${user.backgroundPath}')` }}
        >
          <div className="absolute bottom-[10%] left-[10%] flex select-none">
            <Image
              className="rounded-full border-2 border-white"
              src={user.avatarPath}
              width={100}
              height={100}
              alt="big avatar"
            />
            <div className="mt-3 ml-2 select-none">
              <h2 className="text-2xl font-medium"> {user.login} </h2>
              <span className="my-1">
                {process.browser && isCurrent ? <EditUserModal /> : null}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5 h-screen"> Coming soon...</div>
    </div>
  );
};

export default UserPage;
