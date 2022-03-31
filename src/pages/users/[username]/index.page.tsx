import React, { useEffect } from 'react';
import Error from 'next/error';
import Image from 'next/image';

import { Page, ServerSideProps } from 'app/next';
import { withSessionSsr } from 'services/session.service';
import { useLayoutContext } from 'context/layout.context';
import { UserModel } from 'models';
import { UsersMapper } from 'mapper';
import Title from 'components/layouts/Title';

interface ValidProps {
  user: User;
  isCurrent: boolean;
}

interface ErrorProps {
  error: ErrorPage;
}

type Props = ValidProps | ErrorProps;

// TODO remote ts-ignore
// @ts-ignore
export const getServerSideProps: ServerSideProps<Props> = withSessionSsr(
  // @ts-ignore
  async ({ query, req }) => {
    const { username } = query;
    const { user: sessionUser } = req.session;

    const [user] = UsersMapper.one(await UserModel.findByUsername(username as string));

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

export const UserPage: Page<Props> = (props) => {
  const {
    activeTransparentState: [_, setHeaderTransparent],
  } = useLayoutContext();

  useEffect(() => {
    setHeaderTransparent(true);

    return () => setHeaderTransparent(false);
  }, [setHeaderTransparent]);

  if ('error' in props)
    return <Error statusCode={props.error.statusCode} title={props.error.message} />;

  const { user, isCurrent } = props;

  return (
    <>
      <Title>{user.username}</Title>
      <div className="w-full">
        <div
          className="relative bg-center -mt-header h-400 bg-no-repeat bg-cover bg-clip-padding bg-primary"
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
              <h2 className="text-2xl font-medium"> {user.username} </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5 h-screen"> Coming soon...</div>
    </>
  );
};

export default UserPage;
