import * as fs from 'fs';

import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import Security from 'services/security.service';
import { verifyUser } from 'middlewares/auth.middleware';
import { UsersMapper } from 'mappers';
import { UserModel } from 'models';
import { defaultUsersMedia, publicPath } from 'resources/constants';

const handler = apiHandler();

handler.get(verifyUser, async (req: ApiRequest, res: ApiResponse<{ user: User }>) => {
  const { session } = req;

  const user = await UserModel.findById(session.user.id);

  return res.json({ success: true, user: UsersMapper.one(user) });
});

handler.patch(
  verifyUser,
  async (req: ApiRequest, res: ApiResponse<{ user: User; token: string }>) => {
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

    const updatedUser = UsersMapper.one(await UserModel.update(user.id, body));

    const token = Security.sign(updatedUser);

    session.user = updatedUser;
    session.token = token;

    await session.save();

    return res.json({ success: true, user: updatedUser, token: token });
  }
);

export default withSessionApi(handler);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
