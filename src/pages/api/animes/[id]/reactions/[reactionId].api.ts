import { ApiRequest, ApiResponse } from 'app/next';
import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { verifyUser } from 'resources/middleware';
import { ReactionModel } from 'models';
import ApiError from 'class/error/ApiError';

handler.delete(verifyUser, async (req: ApiRequest, res: ApiResponse) => {
  const { reactionId } = req.query;
  const { session } = req;

  const reaction = await ReactionModel.findById(+reactionId);

  if (!reaction) throw new ApiError(404, 'Reaction not found');
  if (reaction.user_id !== session.user.id)
    throw new ApiError(403, 'You are not allowed to delete this reaction');

  await ReactionModel.deleteParent(+reactionId);
  await ReactionModel.delete(+reactionId);

  res.status(204).json({ success: true });
});

export default withSessionApi(handler);
