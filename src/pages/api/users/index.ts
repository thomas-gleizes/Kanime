import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';

import { DefaultErrorData, DefaultResponseData } from '@types';
import { verifyUser, withSessionApi } from '@services/session';
import router from '@lib/routing/router';
import { UserModel } from '@models';
import { defaultUsersMedia } from '@lib/constants';

interface Data extends DefaultResponseData {}

interface Error extends DefaultErrorData {}

// var matches = string.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

router.patch(
  verifyUser,
  async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
    const {
      body,
      session: { user },
    } = req;

    const path = `${process.cwd()}/public/media/users/${user.id
      .toString()
      .split('')
      .join('/')}`;

    if (body.avatar !== user.avatarPath) {
      if (user.avatarPath !== defaultUsersMedia.avatar) fs.unlinkSync(user.avatarPath);

      const avatarPath = `${path}/avatar.png`;
      await fs.promises.writeFile(avatarPath, new Buffer(body.avatar, 'base64'));
      body.backgroundPath = avatarPath;
    }

    if (body.background !== user.backgroundPath) {
      if (user.backgroundPath !== defaultUsersMedia.background)
        fs.unlinkSync(user.backgroundPath);

      const backgroundPath = `${path}/background.png`;
      await fs.promises.writeFile(backgroundPath, new Buffer(body.background, 'base64'));
      body.backgroundPath = backgroundPath;
    }

    const updatedUser = await UserModel.update(user.id, body);

    res.status(200).send({ success: true, params: updatedUser });
  }
);

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
