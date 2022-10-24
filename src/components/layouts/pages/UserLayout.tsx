import React, { useEffect } from 'react';
import Image from 'next/image';

import { LayoutContentComponent, LayoutProps } from 'app/types';
import { useLayoutContext } from 'context/layout.context';
import { DEFAULT_USER_MEDIA } from 'resources/constants';
import DefaultLayout from 'components/layouts/pages/DefaultLayout';
import ErrorBoundary from 'components/layouts/errors/ErrorBoundary';

interface Props {
  user: User;
  entries: Entries;
  isCurrent: boolean;
}

interface UserLayoutProps extends LayoutProps<Props> {}

const UserLayout: Component<UserLayoutProps> = ({ children, exception, pageProps }) => {
  const {
    activeTransparentState: [, setHeaderTransparent],
  } = useLayoutContext();

  useEffect(() => {
    setHeaderTransparent(true);

    return () => setHeaderTransparent(false);
  }, [setHeaderTransparent]);

  return (
    <ErrorBoundary exception={exception}>
      <UserLayoutContent {...pageProps}>{children}</UserLayoutContent>
    </ErrorBoundary>
  );
};

const UserLayoutContent: LayoutContentComponent<Props> = ({ user, children }) => {
  return (
    <DefaultLayout>
      <div className="w-full">
        <div
          className="relative bg-center -top-header h-400 bg-no-repeat bg-cover bg-clip-padding bg-primary"
          style={{ backgroundImage: `url('${user.backgroundPath}')` }}
        >
          <div className="absolute bottom-[10%] left-[10%] flex select-none">
            <Image
              className="rounded-full border-2 border-white"
              src={user.avatarPath || DEFAULT_USER_MEDIA.avatar}
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
