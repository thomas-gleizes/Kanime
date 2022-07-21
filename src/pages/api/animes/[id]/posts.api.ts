import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { verifyUser } from 'middlewares/auth.middleware';
import { ApiError } from 'errors';
import { AnimeModel, PostModel } from 'models';
import { PostsMapper } from 'mappers';
import HttpStatus from 'resources/HttpStatus';

interface GetResponseData extends DefaultResponseData {
  posts: Posts;
  total: number;
}

interface PostResponseData extends DefaultResponseData {
  post: Post;
}

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<GetResponseData>) => {
  const { id } = req.query;

  const posts = PostsMapper.many(await PostModel.findByAnimes(+id));

  return res.json({ success: true, total: posts.length, posts });
});

handler.post(verifyUser, async (req: ApiRequest, res: ApiResponse<PostResponseData>) => {
  const {
    body,
    query: { id: animeId },
    session: { user },
  } = req;

  if (body.constructor.length > 0)
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Content message missing');

  if (!(await AnimeModel.isExist(+animeId)))
    throw new ApiError(HttpStatus.NOT_FOUND, 'Anime not found');

  const post = await PostModel.create({
    userId: user.id,
    animeId: +animeId,
    content: body.content,
    parentId: body.parentId,
  });

  return res.json({ success: true, post: PostsMapper.one(post) });
});

handler.delete(verifyUser, async (req: ApiRequest, res: ApiResponse<any>) => {
  const {
    query: { id: animeId },
    session: { user },
  } = req;

  const post = await PostModel.findByAnimeIdAndUserId(+animeId, user.id);

  if (!post) throw new ApiError(HttpStatus.NOT_FOUND, 'Post not found');

  if (post.user_id !== user.id)
    throw new ApiError(HttpStatus.BAD_GATEWAY, 'You are not allowed to delete this post');

  await Promise.all([PostModel.deleteParent(post.id), PostModel.delete(post.id)]);

  return res.status(HttpStatus.NO_CONTENT).json({ success: true });
});

export default withSessionApi(handler);
