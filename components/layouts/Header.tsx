import React from "react";
import Link from "next/link";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const Header: React.FunctionComponent<Props> = (props) => {
  return (
    <header {...props}>
      <div className="bg-blue-500 h-50 shadow-xl px-8">
        <div className="flex justify-between h-full w-full my-auto">
          <div className="my-auto">
            <Link href="/animes">
              <a>
                <h1 className="text-2xl cursor-pointer text-white font-semibold">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </h1>
              </a>
            </Link>
          </div>
          <div className="my-auto">
            <Link href="/auth">
              <a className="text-2xl text-white font-semibold">Connexion</a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
