import React, { useEffect, useMemo, useState } from 'react';
import { EntryStatus, Visibility } from '@prisma/client';

import type { Page } from 'next/app';
import { ssrHandler } from 'services/handler.service';
import { EntryModel, UserFollowModel, UserModel } from 'models';
import { EntriesMapper, UsersMapper } from 'mappers';
import { SsrError } from 'errors';
import { errorMessage } from 'resources/constants';
import { useScrollPercent, useStateProps, useDelayBoolean } from 'hooks';
import UserLayout from 'components/layouts/pages/UserLayout';
import Title from 'components/layouts/Title';
import AnimesEntry from 'components/common/anime/AnimesEntry';
import classnames from 'classnames';

interface Props {
  user: User;
  entries: Entries;
  isCurrent: boolean;
  error?: ErrorPage;
}

export const getServerSideProps = ssrHandler<Props, { slug: string }>(
  async ({ query, req }) => {
    const { slug } = query;
    const { user: sessionUser } = req.session;

    const user = await UserModel.findBySlug(slug as string);
    if (!user) throw new SsrError(404, errorMessage.USER_NOT_FOUND);

    const visibility: Visibility[] = ['public'];
    if (sessionUser)
      if (user.id === sessionUser.id) visibility.push('limited', 'private');
      else {
        const [one, two] = await Promise.all([
          UserFollowModel.isFollow(user.id, sessionUser.id),
          UserFollowModel.isFollow(sessionUser.id, user.id),
        ]);

        if (one && two) visibility.push('limited');
      }

    const entries = EntriesMapper.many(
      await EntryModel.getByUser(
        user.id,
        visibility,
        undefined,
        { field: 'rating', order: 'desc' },
        {
          include: { anime: true },
          limit: 1000,
        }
      )
    );

    return {
      props: {
        user: UsersMapper.one(user),
        isCurrent: user.id === sessionUser?.id,
        entries: entries,
      },
    };
  }
);

const StatusButton: Component<{
  active: boolean;
  libelle: string;
  counter: number;
  color: TailwindcssColors;
  onClick: () => void;
}> = ({ active, libelle, counter, color, onClick }) => {
  const className = useMemo(() => {
    if (active) {
      return {
        text: 'text-white',
        span: 'text-white',
        wrapper: `bg-${color}-500`,
      };
    }

    return {
      text: 'text-gray-400 group-hover:text-gray-600 transition duration-100',
      span: 'text-sm text-gray-400 group-hover:text-gray-500 transition duration-100',
      wrapper: `bg-${color}-100 hover:bg-${color}-200`,
    };
  }, [color, active]);

  return (
    <div
      className={classnames(
        'border group flex justify-between select-none items-baseline p-3 font-bold rounded-sm shadow cursor-pointer transition duration-100',
        className.wrapper
      )}
      onClick={onClick}
    >
      <p className={className.text}>{libelle}</p>
      <span className={className.span}>{counter}</span>
    </div>
  );
};

export const UserPage: Page<Props> = ({ user, ...props }) => {
  const [status, setStatus] = useState<EntryStatus | 'All'>('All');
  const [limit, setLimit] = useState<number>(20);
  const [entries, setEntries] = useStateProps(props.entries);
  const [query, setQuery] = useState<string>('');

  const percent = useScrollPercent();

  const updateEntriesList = (action: 'delete' | 'update', entry: Entry) => {
    const index = entries.findIndex((search) => search.animeId === entry.animeId);

    if (action === 'update') entries[index] = entry;
    else entries.splice(index, 1);

    setEntries([...entries]);
  };

  const [bool, trigger] = useDelayBoolean(200);

  useEffect(() => {
    if (!bool && percent > 95) {
      trigger();
      setLimit(limit + 20);
    }
  }, [percent]);

  const counter = useMemo<{ [key: string]: number }>(() => {
    const result = {};

    for (const status of Object.values(EntryStatus)) result[status] = 0;

    for (const entry of entries) result[entry.status]++;

    return result;
  }, [entries]);

  const filteredEntries = useMemo<Entries>(() => {
    let searchQuery = query.toLowerCase();

    return entries
      .filter((entry) => status === 'All' || entry.status === status)
      .filter(
        (entry) =>
          entry.anime.canonicalTitle.toLowerCase().includes(searchQuery) ||
          entry.anime.titles.en?.toLowerCase()?.includes(searchQuery) ||
          entry.anime.titles.en_jp?.toLowerCase()?.includes(searchQuery)
      );
  }, [status, query, entries]);

  return (
    <>
      <Title>{user.username}</Title>
      <div className="relative flex justify-center space-x-5 min-h-screen">
        <div className="w-250 sticky top-20 mt-10 h-fit mx-5">
          <div className="flex flex-col space-y-1 w-inherit p-3 h-full border rounded-lg">
            <StatusButton
              active={status === 'All'}
              libelle="Tous les animes"
              counter={entries.length}
              onClick={() => setStatus('All')}
              color="teal"
            />
            <StatusButton
              active={status === EntryStatus.Completed}
              libelle="Termin??e"
              counter={counter[EntryStatus.Completed]}
              onClick={() => setStatus(EntryStatus.Completed)}
              color="green"
            />
            <StatusButton
              active={status === EntryStatus.Watching}
              libelle="En cours de visionnage"
              counter={counter[EntryStatus.Watching]}
              onClick={() => setStatus(EntryStatus.Watching)}
              color="blue"
            />
            <StatusButton
              active={status === EntryStatus.Wanted}
              libelle="Planifier"
              counter={counter[EntryStatus.Wanted]}
              onClick={() => setStatus(EntryStatus.Wanted)}
              color="violet"
            />
            <StatusButton
              active={status === EntryStatus.OnHold}
              libelle="En pause"
              counter={counter[EntryStatus.OnHold]}
              onClick={() => setStatus(EntryStatus.OnHold)}
              color="yellow"
            />
            <StatusButton
              active={status === EntryStatus.Dropped}
              libelle="Abandonn??e"
              counter={counter[EntryStatus.Dropped]}
              onClick={() => setStatus(EntryStatus.Dropped)}
              color="red"
            />
          </div>
        </div>
        <div className="max-w-1000">
          <div className="w-full p-2">
            <div className="p-3 border-2 border-gray-300 bg-gray-100 shadow rounded w-full h-full">
              {/*TODO: SEARCH INPUT*/}
              <input
                className="bg-transparent py-2 text-lg"
                placeholder="Recherch?? ..."
                onChange={(event) => setQuery(event.currentTarget.value)}
                value={query}
              />
            </div>
          </div>
          <div className="grid grid-cols-5">
            {filteredEntries.slice(0, limit).map((entry) => (
              <div key={entry.animeId} className="my-3 mx-1 mx-auto">
                <AnimesEntry
                  entry={entry}
                  editable={props.isCurrent}
                  updateList={updateEntriesList}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

UserPage.layout = UserLayout;

export default UserPage;
