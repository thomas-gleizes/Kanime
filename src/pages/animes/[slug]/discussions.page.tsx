import React from 'react';

import { Page, ServerSideProps } from 'app/next';
import { withSessionSsr } from 'services/session.service';
import { AnimeModel, ReactionModel } from 'models';
import { AnimesMapper, ReactionsMapper } from 'mapper';
import AnimeLayout from 'components/layouts/pages/AnimeLayout';
import random from 'utils/random';
import RecursiveTag from 'components/common/RecursiveTag';

interface Props {
  anime: Anime;
  reactions: Reactions;
}

export const getServerSideProps: ServerSideProps<Props> = withSessionSsr(
  async ({ params }) => {
    const { slug } = params;

    const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));
    const reactions: Reactions = ReactionsMapper.many(
      await ReactionModel.findByAnimes(anime.id)
    );

    return { props: { anime, reactions } };
  }
);

const DiscussionsPage: Page<Props> = ({ anime, reactions }) => {
  return (
    <div>
      <h1 className="text-xl font-black text-center">Discussions</h1>
      <RecursiveTag tags={['div', 'span', 'section']} n={random(1, 20)}>
        {reactions.map((reaction) => (
          <div key={reaction.id}>
            {reaction.user.username} say: {reaction.content}
          </div>
        ))}
      </RecursiveTag>
    </div>
  );
};

DiscussionsPage.layout = AnimeLayout;

export default DiscussionsPage;
