import * as fs from 'fs';

import { ApiRequest, ApiResponse } from 'app/next';
import handler from 'services/handler.service';
import Security from 'services/security.service';
import { verifyUser } from 'ressources/middleware';
import { UsersMapper } from 'mapper';
import { UserModel } from 'models';
import { defaultUsersMedia, publicPath } from 'ressources/constants';
import { withSessionApi } from 'services/session.service';

interface ResponseGetData extends DefaultResponseData {
  user: User;
}

interface ResponsePatchData extends DefaultResponseData {
  user: User;
  token: string;
}

// var matches = string.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),

handler.get(verifyUser, async (req: ApiRequest, res: ApiResponse<ResponseGetData>) => {
  const { session } = req;

  const [user] = UsersMapper.one(await UserModel.findById(session.user.id));

  res.send({ success: true, user: user });
});

handler.patch(
  verifyUser,
  async (req: ApiRequest, res: ApiResponse<ResponsePatchData>) => {
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
