import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultErrorData, DefaultResponseData, User } from '@types';
import connexion from '@lib/connexion';
import router from '@lib/router/router';
import Security from '@lib/security';
import { withSessionApi } from '@lib/session';
import usersResources from '@lib/resources/UsersResources';
import { ApiError } from '@errors';

interface Data extends DefaultResponseData {
  user: User;
}

router.post(
  async (req: NextApiRequest, res: NextApiResponse<Data | DefaultErrorData>) => {
    const {
      body: { email, password }
    } = req;

    const [user, hash]: [User, string] = usersResources.one(
      await connexion.user.findUnique({
        where: { email }
      })
    );

    if (!user || !(await Security.compare(password, hash))) {
      throw new ApiError(401, 'email/password wrong');
    }

    user.token = Security.sign(user);

    req.session.user = user;
    await req.session.save();

    res.send({ success: true, user });
  }
);

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
