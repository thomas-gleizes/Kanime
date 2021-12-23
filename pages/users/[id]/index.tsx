import { GetServerSideProps, NextPage } from 'next';
import Error from 'next/error';
import React from 'react';


import { User } from '@types';
import { withSessionSsr } from '@lib/session';
import { UserModel } from '@models';
import { UsersResources } from '@resources';
import Content from '@layouts/Content';

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
          isCurrent: user.id === sessionUser?.id
        }
      };
    } else {
      return {
        props: {
          error: {
            code: 404,
            message: 'user not found'
          }
        }
      };
    }

  }
);

export const Home: NextPage<Props> = ({ user, isCurrent, error }) => {
  if (error)
    return <Error statusCode={error.code} title={error.message} />;

  return (
    <Content>
      <div className='h-screen'>
        <div>{JSON.stringify(user)}</div>
        <div>
          {isCurrent ? 'current' : 'none'}</div>
      </div>
    </Content>
  );
};

export default Home;
