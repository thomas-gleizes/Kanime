import React from 'react';
import { NextPage } from 'next';
import AnimeLayout from '@layouts/pages/AnimeLayout';

const AnimeCategories: NextPage = ({ ...props }) => {
  return (
    <>
      <h1 className="text-xl font-black text-center my-10">Categories</h1>
    </>
  );
};

AnimeCategories.Layout = AnimeLayout;

export default AnimeCategories;
