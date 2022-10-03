import React from 'react';
import { Form, Formik } from 'formik';

import { Page } from 'next/app';
import { ssrHandler } from 'services/handler.service';
import { animeModel, postModel } from 'models';
import { animesMapper, postsMapper } from 'mappers';
import { SsrException } from '../../../exceptions';
import { errorMessage } from 'resources/constants';
import random from 'utils/random';
import { Field } from 'components/common/formik';
import AnimeLayout, { AnimeLayoutProps } from 'components/layouts/pages/AnimeLayout';
import RecursiveTag from 'components/common/RecursiveTag';

interface Props extends AnimeLayoutProps {
  posts: Posts;
}

export const getServerSideProps = ssrHandler<Props, { slug: string }>(
  async ({ params }) => {
    const { slug } = params;

    const anime = await animeModel.findBySlug(slug);
    if (!anime) throw new SsrException(404, errorMessage.ANIME_NOT_FOUND);

    const posts = await postModel.findByAnimes(anime.id);

    return {
      props: {
        anime: animesMapper.one(anime),
        posts: postsMapper.many(posts),
      },
    };
  }
);

const DiscussionsPage: Page<Props> = ({ posts }) => {
  return (
    <div>
      <h1 className="text-xl font-black text-center">Discussions</h1>
      <RecursiveTag tags={['div', 'span', 'section']} n={random(1, 20)}>
        {posts.map((post) => (
          <div key={post.id}>
            {post.user.username} say: {post.content}
          </div>
        ))}
      </RecursiveTag>
      <div>
        <Formik initialValues={{ content: '' }} onSubmit={() => null}>
          <Form>
            <Field name="content" label="Message" />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

DiscussionsPage.layout = AnimeLayout;

export default DiscussionsPage;
