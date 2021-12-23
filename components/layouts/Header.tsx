import React from 'react';
import Link from 'next/link';
import { useToggle } from '@hooks';
import appAxios from '@lib/api/appAxios';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const Header: React.FunctionComponent<Props> = (props) => {
  const [_, toggle] = useToggle();

  return (
    <header {...props} onClick={toggle}>
      <div className="bg-blue-500 h-50 shadow-xl px-8">
        <div className="flex justify-between h-full w-full my-auto">
          <div className="my-auto w-1/2">
            <Link href="/animes">
              <a>
                <h1 className="text-2xl cursor-pointer text-white font-semibold">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </h1>
              </a>
            </Link>
          </div>
          <div className="flex justify-evenly w-1/2 my-auto">
            <Link href="/auth">
              <a className="text-2xl text-white font-semibold">Connexion</a>
            </Link>
            <Link href="/admin">
              <a className="text-2xl text-white font-semibold">Admin</a>
            </Link>
            <div onClick={() => appAxios.post('auth/logout')}>logout</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
