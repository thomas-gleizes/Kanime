import React, { useEffect, useMemo } from 'react';
import Error from 'next/error';
import Link from 'next/link';
import Image from 'next/image';

import { Anime, Entry } from '@types';
import { ErrorPage } from '@errors';
import { useLayoutContext } from '@context/layout';
import { routes } from '@lib/constants';
import Title from '@layouts/Title';
import classnames from 'classnames';

interface Props {
  children: any;
  anime: Anime;
  animeUser: Entry | null;
  error?: ErrorPage;
}

const TABS: Array<{ label: string; path: string }> = [
  { label: 'Résumé', path: '' },
  { label: 'Catégories', path: '/categories' },
  { label: 'Discussions', path: '/discussions' },
  { label: 'Saga', path: '/saga' },
  { label: 'Episodes', path: '/episodes' },
  { label: 'Personnages', path: '/characters' },
];

const NavLink: React.FunctionComponent<{ href: string; children: string }> = ({
  href,
  children,
}) => {
  const active = useMemo(
    () => document.location.pathname === href,
    [href, document.location.pathname]
  );

  if (active) console.log(children);

  return (
    <Link href={href}>
      <a
        className={classnames(
          'block px-4 py-2 font-medium text-md transition duration-500 hover:bg-gray-200',
          { 'bg-white text-gray-500': !active, 'bg-gray-100 text-gray-700': active }
        )}
      >
        {children}
      </a>
    </Link>
  );
};

const AnimeLayout: React.FunctionComponent<Props> = ({
  children,
  anime,
  animeUser,
  error,
}) => {
  const {
    activeTransparentState: [_, setHeaderTransparent],
  } = useLayoutContext();

  useEffect(() => {
    setHeaderTransparent(true);

    return () => setHeaderTransparent(false);
  }, [setHeaderTransparent]);

  if (error) return <Error statusCode={error.statusCode} title={error.title} />;

  if (!anime) return null;

  return (
    <>
      <Title>{anime.canonicalTitle}</Title>
      <div className="bg-gray-100 min-h-screen pb-16">
        <div className="w-full">
          <div className="relative w-full h-[400px]">
            <div
              className="relative h-full"
              style={{ backgroundImage: `url('${anime.cover?.small}')` }}
            >
              <div className="w-full h-full bg-black bg-opacity-40" />
            </div>
          </div>
          <nav className="relative bg-white p-0 w-full">
            <div className="flex justify-center divide-x-2 divide-gray-200">
              {TABS.map((tab, index) => (
                <NavLink key={index} href={`${routes.animes}/${anime.slug}${tab.path}`}>
                  {tab.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
        <div className="w-full">
          <div className="mx-auto w-full max-w-[1150px]">
            <div className="sticky float-right w-200 top-[230px]">
              <div className="relative top-[-150px]">
                <span className="w-[214px] h-[304px] bg-kitsu">
                  {anime.poster?.small ? (
                    <Image
                      src={anime.poster.small as string}
                      width={214}
                      height={304}
                      alt="test"
                    />
                  ) : (
                    <div className="h-full w-full bg-primary" />
                  )}
                </span>
              </div>
            </div>
            <div className="mr-[210px]">
              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeLayout;
