import type { Page, StaticProps } from 'app/next';

import { animeModel } from 'models';
import { animesMapper } from 'mappers';
import Title from 'components/layouts/Title';
import PopularAnimes from 'components/landing/PopularAnimes';
import HighRatingAnimes from 'components/landing/HighRatingAnimes';

interface Props {
  time: number;
  animes: {
    popular: Animes;
    rated: Animes;
  };
}

export const getStaticProps: StaticProps<Props> = async () => {
  const [popularAnimes, ratedAnimes] = await Promise.all([
    animeModel.findPopular(),
    animeModel.findHighRated(),
  ]);

  return {
    props: {
      time: Date.now(),
      animes: {
        popular: animesMapper.many(popularAnimes),
        rated: animesMapper.many(ratedAnimes),
      },
    },
    revalidate: 60 * 5,
  };
};

const HomePage: Page<Props> = ({ time, animes }) => {
  return (
    <>
      <Title>Accueil</Title>
      <div className="flex flex-col-2 items-center justify-center h-[80vh] py-2">
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="text-center">{time}</div>
          <h1 className="text-6xl font-bold first-letter:text-[#db8000]">
            Bienvenue sur{' '}
            <span className="text-sky-500 font-gang-of-three">
              {process.env.NEXT_PUBLIC_APP_NAME}!
            </span>
          </h1>

          <p className="mt-3 text-2xl">
            Cherché tous vos <strong>animes</strong>
          </p>

          <div className="flex flex-col space-y-3 bg-red-500 h-40 w-full">
            <HighRatingAnimes animes={animes.rated} />
            <PopularAnimes animes={animes.popular} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
