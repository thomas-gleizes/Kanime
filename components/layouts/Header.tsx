import React, { useRef, useState } from 'react';
import { FaBars, FaCaretDown } from 'react-icons/fa';
import Link from 'next/link';
import classnames from 'classnames';

import DropDown from '@components/layouts/DropDown';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
}

const Header: React.FunctionComponent<Props> = (props) => {

  const DropDownItem = ({ href, children }) => (
    <Link href={href}>
      <a className='block w-full py-1.5 px-2 hover:bg-gray-100'>{children}</a>
    </Link>
  );

  const DropDownExplore = () => {
    const button = useRef<HTMLButtonElement>();

    return (
      <div>
        <div>
          <button ref={button} type='button' className='text-white flex group'>
            Explore
            <i className='my-auto h-full ml-0.5'>
              <FaCaretDown
                size={12}
                className='transform transition rotate-90 group-focus:rotate-0'
              />
            </i>
          </button>
        </div>
        <DropDown innerRef={button}>
          <div
            className='absolute py-1 top-5 -left-2 w-32 bg-white ring-1 ring-black ring-opacity-5 text-gray-700 outline-none rounded-sm shadow-lg divide-y'>
            <DropDownItem href='/animes'>Animes</DropDownItem>
            <DropDownItem href='/mangas'>Mangas</DropDownItem>
            <DropDownItem href='sagas'>Sagas</DropDownItem>
          </div>
        </DropDown>
      </div>
    );
  };

  const DropDownUser = () => {
    const imgRef = useRef<HTMLImageElement>();

    return (
      <div>
        <div className='cursor-pointer'>
          {/*<img*/}
          {/*  ref={imgRef}*/}
          {/*  className='rounded-full'*/}
          {/*  src={src}*/}
          {/*  width={35}*/}
          {/*  height={35}*/}
          {/*  alt='avatar'*/}
          {/*/>*/}
        </div>
        <DropDown innerRef={imgRef}>
          <div
            className='absolute py-1 top-12 -right-8 text-right w-40 bg-white ring-1 ring-black ring-opacity-5 text-gray-700 outline-none rounded-sm shadow-lg divide-y'>
            <DropDownItem href={`users/userID`}>Mon profile</DropDownItem>
            <DropDownItem href={`users/userID/settings`}>Settings</DropDownItem>
            <div onClick={() => console.log('logout')}>
              <span className='block w-full py-1.5 px-2 hover:bg-gray-100'>Déconnexion</span>
            </div>
          </div>
        </DropDown>
      </div>
    );
  };

  const [extend, setExtend] = useState<boolean>(false);

  return (
    <header className='z-90 fixed top-0 w-full bg-primary shadow-md'>
      <nav className=''>
        <div className='relative'>
          <div className='hidden md:flex justify-between w-full h-14 px-5'>
            <div className='text-center m-auto'>
              <Link href='/'>
                <a className='cursor-pointer font-bold text-3xl text-white'>
                  {process.env.NEXT_PUBLIC_SITE_NAME}
                </a>
              </Link>
            </div>
            <div className='flex justify-start items-center w-2/5 m-auto'>
              <span className='mx-3'>
                <DropDownExplore />
              </span>
              <span className='mx-3'>
                <Link href='/forum'>
                  <a className='text-white'> Discussion </a>
                </Link>
              </span>
              <span className='mx-3'>
                <Link href='/feedback'>
                  <a className='text-white'> Feedback </a>
                </Link>
              </span>
              {/*{isAdmin ? (*/}
              {/*  <span className='mx-3'>*/}
              {/*    <Link href={admin.index}>*/}
              {/*      <a className='text-white'> Admin </a>*/}
              {/*    </Link>*/}
              {/*  </span>*/}
              {/*) : null}*/}
            </div>
            <div className='flex justify-between w-2/5 px-3 my-auto'>
              {/*<SearchBar />*/}
              {/*{!isLogin ? (*/}
              {/*  <div className='flex justify-around text-white h-full my-auto mx-3'>*/}
              {/*    <span onClick={() => setLoginOpen(true)} className='mx-3 cursor-pointer'>*/}
              {/*      Connexion*/}
              {/*    </span>*/}
              {/*    <span onClick={() => setRegisterOpen(true)} className='mx-3 cursor-pointer'>*/}
              {/*      Inscription*/}
              {/*    </span>*/}
              {/*  </div>*/}
              {/*) : (*/}
              {/*  <DropDownUser />*/}
              {/*)}*/}
            </div>
          </div>

          <div
            className={classnames('block md:hidden transform duration-100', {
              'h-56': extend,
              'h-14': !extend
            })}
          >
            <div className='h-14 flex justify-between'>
              <div className='w-2/3  px-5 my-auto'>
                <Link href='/'>
                  <a className='cursor-pointer font-bold text-3xl text-white'>
                    {process.env.NEXT_PUBLIC_SITE_NAME}
                  </a>
                </Link>
              </div>
              <div className='w-1/3 m-auto px-5 flex justify-end'>
                <i onClick={() => setExtend(!extend)}>
                  <FaBars className='text-white hover:text-gray-200 cursor-pointer' size={32} />
                </i>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
