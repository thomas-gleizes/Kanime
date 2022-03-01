import React, { useEffect, useState } from 'react';

import { Page, ServerSideProps } from 'app/next';
import { ApiService } from 'services/api.service';
import { AnimesMapper } from 'mapper';
import { AnimeModel } from 'models';
import { useScrollPercent } from 'hooks';
import { routes } from 'ressources/routes';
import toast from 'utils/toastr';
import Title from 'components/layouts/Title';
import AnimeCard from 'components/common/AnimeCard';

interface Props {
  animes: Animes;
}

export const getServerSideProps: ServerSideProps<Props> = async ({ query }) => {
  const { skip, limit } = query;

  const animes = AnimesMapper.many(
    await AnimeModel.all({
      limit: +limit || 40,
      skip: +skip,
    })
  );

  return {
    props: { animes },
  };
};

const ExploreAnimes: Page<Props> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [animes, setAnimes] = useState<Animes>(props.animes);

  const percent = useScrollPercent();

  useEffect(() => {
    (async () => {
      if (percent > 80 && !isLoading) {
        setLoading(true);

        try {
          const response = await ApiService.get(routes.animes.api.list, {
            params: { limit: 40, skip: animes.length },
          });

          setAnimes([...animes, ...response.data.animes]);
        } catch (e) {
          toast(e.error, 'error');
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [percent]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Title>Animes</Title>
      <div className="grid grid-cols-4 max-w-1100 mx-auto">
        {animes.map((anime, index) => (
          <div key={index} className="my-3 mx-auto">
            <AnimeCard anime={anime} index={index} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ExploreAnimes;
