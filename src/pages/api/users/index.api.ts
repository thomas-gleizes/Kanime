import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';

import { DefaultResponseData, User } from '@types';
import { verifyUser, withSessionApi } from '@services/session';
import router from '@lib/routing/handler';
import { UserModel } from '@models';
import { defaultUsersMedia, publicPath } from '@lib/constants';
import { UsersMapper } from '@mapper';
import Security from '@services/security';
import { ApiError } from '@errors';

interface GetData extends DefaultResponseData {
  user: User;
}

interface PatchData extends DefaultResponseData {
  user: User;
  token: string;
}

// var matches = string.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

router.get(verifyUser, async (req, res: NextApiResponse<GetData>) => {
  const { session } = req;

  const [user] = UsersMapper.one(await UserModel.findById(session.user.id));

  res.send({ success: true, user: user });
});

router.patch(verifyUser, async (req: NextApiRequest, res: NextApiResponse<PatchData>) => {
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

  const [updatedUser] = UsersMapper.one(await UserModel.update(user.id, body));

  const token = Security.sign(updatedUser);

  session.user = updatedUser;
  session.token = token;

  await session.save();

  res.status(200).send({ success: true, user: updatedUser, token: token });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
