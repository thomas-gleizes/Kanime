import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { verifyUser } from 'middlewares/auth.middleware';
import { ApiError } from 'class/error';
import { AnimeModel, PostModel } from 'models';
import { PostsMapper } from 'mappers';

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

  res.json({ success: true, total: posts.length, posts });
});

handler.post(verifyUser, async (req: ApiRequest, res: ApiResponse<PostResponseData>) => {
  const {
    body,
    query: { id: animeId },
    session: { user },
  } = req;

  if (body.constructor.length > 0) throw new ApiError(400, 'Content message missing');

  if (!(await AnimeModel.isExist(+animeId))) throw new ApiError(404, 'Anime not found');

  const post = await PostModel.create({
    userId: user.id,
    animeId: +animeId,
    content: body.content,
    parentId: body.parentId,
  });

  res.json({ success: true, post: PostsMapper.one(post) });
});

handler.delete(verifyUser, async (req: ApiRequest, res: ApiResponse<any>) => {
  const {
    query: { id: animeId },
    session: { user },
  } = req;

  const post = await PostModel.findByAnimeIdAndUserId(+animeId, user.id);

  if (!post) throw new ApiError(404, 'Post not found');

  if (post.user_id !== user.id)
    throw new ApiError(403, 'You are not allowed to delete this post');

  await Promise.all([PostModel.deleteParent(post.id), PostModel.delete(post.id)]);

  res.status(204).json({ success: true });
});

export default withSessionApi(handler);
