import React, { useEffect } from 'react';
import Image from 'next/image';
import Error from 'next/error';

import { useLayoutContext } from 'context/layout.context';
import DefaultLayout from 'components/layouts/pages/DefaultLayout';

export type UserLayoutProps = {
  user: User;
  entries: Entries;
  isCurrent: boolean;
  error?: ErrorPage;
};

interface Props extends UserLayoutProps {
  children: ReactNode;
}

const UserLayout: Component<Props> = ({ children, user, ...props }) => {
  const {
    activeTransparentState: [, setHeaderTransparent],
  } = useLayoutContext();

  useEffect(() => {
    setHeaderTransparent(true);

    return () => setHeaderTransparent(false);
  }, [setHeaderTransparent]);

  if ('error' in props)
    return <Error statusCode={props.error.statusCode} title={props.error.message} />;

  return (
    <DefaultLayout>
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
              <h2 className="text-2xl font-medium">{user.username}</h2>
            </div>
          </div>
        </div>
      </div>

      {children}
    </DefaultLayout>
  );
};

export default UserLayout;
