import { ApiRequest, ApiResponse } from 'app/next';
import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { AnimeModel, ReactionModel } from 'models';
import { ReactionsMapper } from 'mapper';
import ApiError from 'class/error/ApiError';
import { verifyUser } from 'resources/middleware';

interface GetResponseData extends DefaultResponseData {
  reactions: Reactions;
  total: number;
}

interface PostResponseData extends DefaultResponseData {
  reaction: Reaction;
}

handler.get(async (req: ApiRequest, res: ApiResponse<GetResponseData>) => {
  const { id } = req.query;

  const reactions = ReactionsMapper.many(await ReactionModel.findByAnimes(+id));

  res.json({ success: true, total: reactions.length, reactions });
});

handler.post(verifyUser, async (req: ApiRequest, res: ApiResponse<PostResponseData>) => {
  const {
    body,
    query: { id: animeId },
    session: { user },
  } = req;

  if (body.constructor.length > 0) throw new ApiError(400, 'Content message missing');

  if (!(await AnimeModel.isExist(+animeId))) throw new ApiError(404, 'Anime not found');

  const reaction = await ReactionModel.create({
    userId: user.id,
    animeId: +animeId,
    content: body.content,
    parentId: body.parentId,
  });

  res.json({ success: true, reaction: ReactionsMapper.one(reaction) });
});

handler.delete(verifyUser, async (req: ApiRequest, res: ApiResponse<any>) => {
  const {
    query: { id: animeId },
    session: { user },
  } = req;

  const reaction = await ReactionModel.findByAnimeIdAndUserId(+animeId, user.id);

  if (!reaction) throw new ApiError(404, 'Reaction not found');

  if (reaction.user_id !== user.id)
    throw new ApiError(403, 'You are not allowed to delete this reaction');

  await ReactionModel.deleteParent(reaction.id);
  await ReactionModel.delete(reaction.id);

  res.status(204).json({ success: true });
});

export default withSessionApi(handler);
