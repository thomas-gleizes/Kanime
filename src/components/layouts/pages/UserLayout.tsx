import React, { useEffect } from 'react';
import Image from 'next/image';

import { useLayoutContext } from 'context/layout.context';
import DefaultLayout from 'components/layouts/pages/DefaultLayout';
import { LayoutProps } from 'app/types';

interface Props {
  user: User;
  entries: Entries;
  isCurrent: boolean;
}

interface UserLayoutProps extends LayoutProps<Props> {}

const UserLayout: Component<UserLayoutProps> = ({ children, pageProps }) => {
  const {
    activeTransparentState: [, setHeaderTransparent],
  } = useLayoutContext();

  useEffect(() => {
    setHeaderTransparent(true);

    return () => setHeaderTransparent(false);
  }, [setHeaderTransparent]);

  const { user, entries, isCurrent } = pageProps;

  return (
    <DefaultLayout pageProps={undefined}>
      <div className="w-full">
        <div
          className="relative bg-center -top-header h-400 bg-no-repeat bg-cover bg-clip-padding bg-primary"
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
