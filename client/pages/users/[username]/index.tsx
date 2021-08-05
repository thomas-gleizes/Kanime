import React, { useMemo, useState } from "react";
import Head from "next/head";
import Error from "next/error";
import { FaEllipsisH } from "react-icons/fa";

import { UserApi } from "../../../api";
import { useUserContext, useUserContextAction } from "../../../context/user";
import { img } from "../../../ressources/routes";
import { ApiError } from "../../../helpers/interfaces/global";
import UserProps from "../../../helpers/interfaces/user";
import addToast, { TOAST_ERROR } from "../../../helpers/toastr";
import { Button } from "../../../components/common/Form";
import Layout from "../../../components/layouts/Layout";
import UserList from "../../../components/common/UserList";
import EditUserModal from "../../../components/modal/EditUserModal";

interface Props {
  user?: UserProps;
  error?: ApiError;
}

export const getServerSideProps = async ({ query }) => {
  let props: Props = {};

  try {
    const { data } = await UserApi.find(query.username);
    props.user = data.user;
  } catch (error) {
    props.error = error;
  }

  return { props };
};

const User: React.FC<Props> = ({ user, error }) => {
  const { user: currentUser, isLogin } = useUserContext();
  const { updateUser } = useUserContextAction();
  const [editModal, setEditModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isCurrent, isFollow } = useMemo(() => {
    if (isLogin) {
      return {
        isCurrent: currentUser?.id === user?.id,
        isFollow: currentUser?.follow.includes(user?.id),
      };
    }
    return { isCurrent: false, isFollow: false };
  }, [isLogin, currentUser, user]);

  const { avatar, background } = useMemo(
    () =>
      [
        {
          avatar: user.media?.avatar
            ? process.env.NEXT_PUBLIC_API + user.media.avatar
            : img.default.avatar,
          background: user.media?.avatar
            ? process.env.NEXT_PUBLIC_API + user.media.background
            : img.default.background,
        },
      ][0],
    [isCurrent]
  );

  const handleFollow = async (event) => {
    const { target } = event;
    setIsSubmitting(true);

    try {
      const { data } = await UserApi.follow(target.value);
      updateUser({ ...currentUser, follow: data.follow });
    } catch (error) {
      addToast(error.message, TOAST_ERROR);
    }
    setIsSubmitting(false);
  };

  const handleUnfollow = async (event) => {
    const { target } = event;
    setIsSubmitting(true);

    try {
      const { data } = await UserApi.unfollow(target.value);
      updateUser({ ...currentUser, follow: data.follow });
    } catch (error) {
      addToast(error.message, TOAST_ERROR);
    }
    setIsSubmitting(false);
  };

  const handleCloseModal = () => {
    setEditModal(false);
  };

  if (error) return <Error statusCode={error.status} title={error.message} />;

  return (
    <Layout>
      <Head>
        <title>
          {user?.username} | {process.env.NEXT_PUBLIC_SITE_NAME}
        </title>
      </Head>
      <div className="w-full">
        <div
          className="bg-center bg-no-repeat bg-cover bg-clip-padding bg-primary"
          style={{ backgroundImage: `url('${background}')` }}
        >
          <div className="flex pt-32 px-20 pb-10 select-none">
            <img
              className="rounded-full border-2 border-white"
              src={avatar}
              width={100}
              height={100}
              alt="big avatar"
            />
            <div className="mt-3 ml-2 select-none">
              <h2 className="text-2xl"> {user.username} </h2>
              {isCurrent ? (
                <Button
                  onClick={() => setEditModal(true)}
                  className="px-6 py-1.5 rounded-md cursor-pointer text-white bg-secondary hover:bg-primary"
                >
                  Modifier
                </Button>
              ) : !isFollow ? (
                <div className="flex divide-x px-2 py-1 rounded-md cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 text-white">
                  <button
                    value={user.username}
                    onClick={handleFollow}
                    disabled={isSubmitting || !isLogin}
                    className="select-none w-full px-4"
                  >
                    Follow
                  </button>
                  <i className="my-auto">
                    <FaEllipsisH
                      size={18}
                      className="ml-3 mr-1 hover:text-lg"
                    />
                  </i>
                </div>
              ) : (
                <div className="flex">
                  <button
                    value={user.username}
                    onClick={handleUnfollow}
                    className="px-4 py-1 rounded-md cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 text-white"
                    disabled={isSubmitting || !isLogin}
                  >
                    Unfollow
                  </button>
                  <button className="mx-1 px-2 py-1 rounded-md cursor-pointer bg-gradient-to-l from-green-400 to-blue-500 text-white">
                    <FaEllipsisH />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-center mt-5"> Coming soon...</div>
        <UserList />
      </div>

      {isLogin ? (
        <EditUserModal modalOpen={editModal} handleClose={handleCloseModal} />
      ) : null}
    </Layout>
  );
};

export default User;
