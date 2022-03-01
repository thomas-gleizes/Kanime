import React from 'react';
import Link from 'next/link';

import { Page, ServerSideProps } from 'next/app';
import { withSessionSsr } from 'services/session.service';
import { AnimeModel, CategoryModel } from 'models';
import { AnimesMapper, CategoriesMapper } from 'mapper';
import { routes } from 'ressources/routes';
import AnimeLayout from 'components/layouts/pages/AnimeLayout';

interface Props {
  anime: Anime;
  categories: Categories;
}

export const getServerSideProps: ServerSideProps<Props> = withSessionSsr(
  async ({ params }) => {
    const { slug } = params;

    const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

    const categories: Categories = CategoriesMapper.many(
      await CategoryModel.findByAnimeId(anime.id)
    );

    return { props: { anime, categories, test: 'ok' } };
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
