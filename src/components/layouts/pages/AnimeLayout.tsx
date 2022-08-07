import React, { useEffect, useMemo, useState } from 'react';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import {
  EyeIcon,
  PencilAltIcon,
  CheckCircleIcon,
  PlayIcon,
} from '@heroicons/react/solid';

import { ApiService } from 'services/api.service';
import { useLayoutContext } from 'context/layout.context';
import { useUserContext } from 'context/user.context';
import { useDialog } from 'hooks';
import { routes } from 'resources/routes';
import Title from 'components/layouts/Title';
import Menu, { MenuGroup, MenuItem } from 'components/common/inputs/Menu';
import KitsuButton from 'components/common/KitsuButton';
import EditAnimesEntries, {
  Props as EditAnimesEntriesProps,
  Result as EditAnimesEntriesResult,
} from 'components/modal/EditAnimesEntries';
import Img from 'components/common/Img';
import { POSTER_RAPPORT } from 'resources/constants';
import DefaultLayout from 'components/layouts/pages/DefaultLayout';

export interface AnimeLayoutProps {
  anime: Anime;
  error?: ErrorPage;
}

type tab = { label: string; path: string };

const TABS: Array<tab> = [
  { label: 'Résumé', path: '' },
  { label: 'Catégories', path: '/categories' },
  { label: 'Discussions', path: '/discussions' },
  { label: 'Saga', path: '/saga' },
  { label: 'Episodes', path: '/episodes' },
  { label: 'Personnages', path: '/characters' },
];

const NavLink: Component<{ href: string; children: string }> = ({ href, children }) => {
  const router = useRouter();
  const active = useMemo<boolean>(() => router.asPath === href, [router.asPath, href]);

  return (
    <Link href={href}>
      <a
        className={classnames(
          'block px-4 py-2 font-medium text-md transition duration-500 hover:bg-gray-200 hover:text-black',
          { 'bg-white text-gray-300': !active, 'bg-gray-50 text-gray-700': active }
        )}
      >
        {children}
      </a>
    </Link>
  );
};

const AnimeLayout: Component<AnimeLayoutProps & { children: ReactNode }> = ({
  children,
  anime,
  error,
}) => {
  const { isLogin } = useUserContext();
  const {
    activeTransparentState: [_, setHeaderTransparent],
  } = useLayoutContext();

  const dialog = useDialog();

  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    if (isLogin && anime?.id)
      ApiService.get(`/animes/${anime.id}/entries`)
        .then((response) =>
          // @ts-ignore
          setEntry(response?.entry)
        )
        .catch(() => setEntry(undefined));
  }, [isLogin, anime?.id]);

  useEffect(() => {
    setHeaderTransparent(true);

    return () => setHeaderTransparent(false);
  }, [setHeaderTransparent]);

  const handleModal = async () => {
    if (isLogin) {
      const result = await dialog<EditAnimesEntriesProps, EditAnimesEntriesResult>(
        EditAnimesEntries,
        { anime, entry }
      );

      if (result?.action === 'submit') {
        const response = await ApiService.post<{ entry: Entry }>(
          `/animes/${anime.id}/entries`,
          result.values
        );

        // @ts-ignore
        setEntry(response.entry);
      } else if (result?.action === 'delete') {
        await ApiService.delete(`/animes/${anime.id}/entries`);
        setEntry(undefined);
      }
    }
  };

  const handleSetupEntry = (status: EntryStatus) => {
    if (isLogin)
      ApiService.post<{ entry: Entry }>(`/animes/${anime.id}/entries`, { status }).then(
        // @ts-ignore
        (response) => setEntry(response.entry)
      );
  };

  if (error) return <Error statusCode={error.statusCode} title={error.message} />;

  return (
    <DefaultLayout>
      <Title>{anime.canonicalTitle}</Title>
      <div>
        <div className="w-full">
          <div className="relative -top-header w-full h-[450px]">
            <div className="fixed -z-10 w-full h-[450px] bg-primary-dark">
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${anime.cover?.small}')` }}
              >
                <div className="w-full h-full bg-black bg-opacity-40" />
              </div>
            </div>
          </div>
          <nav className="relative bg-white p-0 w-full">
            <div className="flex justify-center divide-x-2 divide-gray-200">
              {TABS.map((tab, index) => (
                <NavLink
                  key={index}
                  href={`${routes.animes.list}/${anime.slug}${tab.path}`}
                >
                  {tab.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
        <div className="w-full bg-gray-50 z-100">
          <div className="mx-auto w-full max-w-[1150px]">
            <div className="sticky float-right w-200 top-[230px]">
              <div className="relative w-[214px] top-[-150px]">
                <div className="w-full shadow h-[304px] rounded-md bg-kitsu mb-2">
                  {anime.poster?.medium && (
                    <Img
                      className="rounded-md"
                      src={anime.poster.medium as string}
                      width={214}
                      height={214 * POSTER_RAPPORT}
                      alt="test"
                    />
                  )}
                </div>
                <div className="w-full">
                  <div className="flex flex-col space-y-2">
                    <div>
                      <KitsuButton slug={anime.slug} />
                    </div>
                    <div>
                      <Menu label="Entries">
                        {!entry && (
                          <MenuGroup>
                            <MenuItem
                              onClick={() => handleSetupEntry('Completed')}
                              icon={<CheckCircleIcon className="h-5 w-5" />}
                            >
                              Terminée
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleSetupEntry('Wanted')}
                              icon={<EyeIcon className="h-5 w-5" />}
                            >
                              A voir
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleSetupEntry('Watching')}
                              icon={<PlayIcon className="h-5 w-5" />}
                            >
                              A Commencé
                            </MenuItem>
                          </MenuGroup>
                        )}
                        <MenuGroup>
                          <MenuItem
                            onClick={handleModal}
                            icon={<PencilAltIcon className="h-5 w-5" />}
                          >
                            Edit
                          </MenuItem>
                        </MenuGroup>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mr-[210px]">
              <div className="w-full py-5">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AnimeLayout;
