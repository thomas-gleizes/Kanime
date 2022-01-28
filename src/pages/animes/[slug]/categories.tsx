import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

import { withSessionSsr } from '@services/session';
import { Anime, Categories } from '@types';
import { AnimesMapper, CategoriesMapper } from '@mapper';
import { AnimeModel, CategoryModel } from '@models';
import { ErrorPage } from '@errors';
import { errorMessage, routes } from '@lib/constants';
import AnimeLayout from '@layouts/pages/AnimeLayout';

export const getServerSideProps = withSessionSsr(async ({ params }) => {
  const { slug } = params;

  const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

  if (!anime)
    return { props: { error: ErrorPage.create(404, errorMessage.ANIME_NOT_FOUND) } };

  const categories: Categories = CategoriesMapper.many(
    await CategoryModel.findByAnimeId(anime.id)
  );

  return { props: { anime, categories } };
});

interface Props {
  anime: Anime;
  categories: Categories;
}

const AnimeCategories: NextPage<Props> = ({ anime, categories }) => {
  return (
    <>
      <h1 className="text-xl font-black text-center my-10">Categories</h1>
      <ul className="list-disc m-10">
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`${routes.categories}/${category.slug}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

// TODO fix types
// @ts-ignore
AnimeCategories.Layout = AnimeLayout;

export default AnimeCategories;
