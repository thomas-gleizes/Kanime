import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';

import { DefaultErrorData, DefaultResponseData, User } from '@types';
import { verifyUser, withSessionApi } from '@services/session';
import router from '@lib/routing/router';
import { UserModel } from '@models';
import { defaultUsersMedia, publicPath } from '@lib/constants';
import { UsersResources } from '@resources';
import Security from '@services/security';

interface Data extends DefaultResponseData {
  user: User;
}

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
    const { body, session } = req;
    const { user } = session;

    const path = `/media/users/${user.id.toString().split('').join('/')}`;
    const fullPath = `${publicPath}${path}`;

    await fs.promises.mkdir(fullPath, { recursive: true });

    // TODO refactor this
    if (!(typeof body.avatar === 'string')) {
      if (user.avatarPath !== defaultUsersMedia.avatar)
        await fs.promises.unlink(publicPath + user.avatarPath);

      const avatarPath = `${path}/avatar.${body.avatar.type.split('/')[1]}`;
      await fs.promises.writeFile(
        publicPath + avatarPath,
        new Buffer(body.avatar.content, 'base64')
      );
      body.avatarPath = avatarPath;
    }

    if (!(typeof body.background === 'string')) {
      if (user.backgroundPath !== defaultUsersMedia.background)
        await fs.promises.unlink(publicPath + user.backgroundPath);

      const backgroundPath = `${path}/background.${body.background.type.split('/')[1]}`;
      await fs.promises.writeFile(
        publicPath + backgroundPath,
        new Buffer(body.background.content, 'base64')
      );
      body.backgroundPath = backgroundPath;
    }

    const [updatedUser] = UsersResources.one(await UserModel.update(user.id, body));

    session.user = { ...updatedUser, token: Security.sign(updatedUser) };
    await session.save();

    res.status(200).send({ success: true, user: session.user });
  }
);

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
