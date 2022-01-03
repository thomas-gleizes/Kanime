import type { NextApiRequest, NextApiResponse } from 'next';

import { DefaultErrorData, DefaultResponseData } from '@types';
import { verifyUser, withSessionApi } from '@services/session';
import router from '@lib/routing/router';
import { UserModel } from '@models';

interface Data extends DefaultResponseData {}

interface Error extends DefaultErrorData {}

router.patch(
  verifyUser,
  async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
    const { body } = req;
    const { id } = req.session.user;

    const user = await UserModel.update(id, body);

    res.status(200).send({ success: true, params: user });
  }
);

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
