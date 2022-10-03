import React from 'react';
import Link from 'next/link';

import { Page } from 'next/app';
import { ssrHandler } from 'services/handler.service';
import { animeModel, categoryModel } from 'models';
import { animesMapper, categoriesMapper } from 'mappers';
import { SsrException } from '../../../exceptions';
import { errorMessage } from 'resources/constants';
import { routes } from 'resources/routes';
import AnimeLayout, { AnimeLayoutProps } from 'components/layouts/pages/AnimeLayout';

interface Props extends AnimeLayoutProps {
  categories: Categories;
}

export const getServerSideProps = ssrHandler<Props, { slug: string }>(
  async ({ params }) => {
    const { slug } = params;

    const anime = await animeModel.findBySlug(slug);
    if (!anime) throw new SsrException(404, errorMessage.ANIME_NOT_FOUND);

    const categories = await categoryModel.findByAnimeId(anime.id);

    return {
      props: {
        anime: animesMapper.one(anime),
        categories: categoriesMapper.many(categories),
      },
    };
  }
);

const AnimeCategories: Page<Props> = ({ anime, categories }) => {
  return (
    <div>
      <h1 className="text-xl font-black text-center">Categories</h1>
      <ul className="list-disc m-10">
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={routes.categories.slug(category.slug)}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

AnimeCategories.layout = AnimeLayout;

export default AnimeCategories;
