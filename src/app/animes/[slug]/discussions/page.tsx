import React from 'react'
import { notFound } from 'next/navigation'

import { animeModel, postModel } from 'models'
import { postsMapper } from 'mappers'
import RecursiveTag from 'components/common/RecursiveTag'
import random from 'utils/random'

interface Props {
  params: {
    slug: string
  }
}

export default async function AnimeDiscussionsPage({ params }: Props) {
  const anime = await animeModel.findBySlug(params.slug)
  if (!anime) notFound()

  const posts = await postModel.findByAnimes(anime.id).then((posts) => postsMapper.many(posts))

  return (
    <div>
      <h1 className="text-xl font-black text-center">Discussions</h1>
      <RecursiveTag tags={['div', 'span', 'section']} n={random(1, 20)}>
        {posts.map((post) => (
          <div key={post.id}>
            {post.user?.username} say: {post.content}
          </div>
        ))}
      </RecursiveTag>
      <div>
        <textarea name="content" />
      </div>
    </div>
  )
}
