import { ApiRequest, ApiResponse, DefaultErrorData, DefaultResponseData } from '@types';
import router from '@lib/router/router';
import connexion from '@lib/connexion';
import UsersResources from '@lib/resources/UsersResources';
import ApiError from '@lib/errors/ApiError';
import { verifyUser, withSessionApi } from '@lib/session';

interface Data extends DefaultResponseData {
}

interface Error extends DefaultErrorData {
  message: string;
}


router.get(async (req: ApiRequest, res: ApiResponse<Data | Error>) => {
  const { id } = req.query;

  const user = await connexion.user.findUnique({
    where: { id: +id }
  });

  if (!user) throw new ApiError(404, 'user not found');

  const users = UsersResources.many(
    await connexion.user.findMany({
      where: {
        followers: { some: { follower_id: +id } }
      }
    })
  ).map(([user]) => user);

  res.send({ success: true, data: users });
});

router.post(verifyUser, async (req: ApiRequest, res: ApiResponse<Data | Error>) => {
  const { query, session } = req;

  try {
    await connexion.userFollow.create({
      data: {
        follower_id: +session.id,
        follow_id: +query.id
      }
    });

    res.status(201).send({ success: true });
  } catch (e) {
    throw new ApiError(400, 'you already follow this user !');
  }
});

router.delete(verifyUser, async (req: ApiRequest, res: ApiResponse<Data | Error>) => {
  const { query, session } = req;

  try {
    const test = await connexion.userFollow.deleteMany({
      where: {
        AND: {
          follower_id: +session.id,
          follow_id: +query.id
        }
      }
    });

    res.status(200).send({ success: true, data: test });
  } catch (e) {
    throw new ApiError(400, 'you can\'t unfollow this user');
  }
});

export default withSessionApi((req: ApiRequest, res: ApiResponse) => {
  router.handler(req, res);
});
