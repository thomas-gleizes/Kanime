import * as fs from 'fs';
import { Body, Get, Patch } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import Security from 'services/security.service';
import { UsersMapper } from 'mappers';
import { UserModel } from 'models';
import { defaultUsersMedia, publicPath } from 'resources/constants';
import { GetSession, AuthGuard } from 'decorators';
import { UpdateUserDto } from 'dto';

class UsersHandler extends ApiHandler {
  @Get()
  @AuthGuard()
  async get(@GetSession() session) {
    const user = await UserModel.findById(session.user.id).then((user) =>
      UsersMapper.one(user)
    );

    return { user };
  }

  @Patch()
  @AuthGuard()
  async update(@Body() body: UpdateUserDto, @GetSession() session) {
    const path = `/media/users/${session.user.id.toString().split('').join('/')}`;
    const fullPath = `${publicPath}${path}`;

    await fs.promises.mkdir(fullPath, { recursive: true });

    // TODO refactor this
    if (!(typeof body.avatar === 'string')) {
      if (session.user.avatarPath !== defaultUsersMedia.avatar)
        await fs.promises.unlink(publicPath + session.user.avatarPath);

      const avatarPath = `${path}/avatar.${body.avatar.type.split('/')[1]}`;
      await fs.promises.writeFile(
        publicPath + avatarPath,
        new Buffer(body.avatar.content, 'base64')
      );

      // TODO refactor this with edit user form
      // @ts-ignore
      body.avatarPath = avatarPath;
    }

    if (!(typeof body.background === 'string')) {
      if (session.user.backgroundPath !== defaultUsersMedia.background)
        await fs.promises.unlink(publicPath + session.user.backgroundPath);

      const backgroundPath = `${path}/background.${body.background.type.split('/')[1]}`;
      await fs.promises.writeFile(
        publicPath + backgroundPath,
        new Buffer(body.background.content, 'base64')
      );

      // TODO refactor this with edit user form
      // @ts-ignore
      body.backgroundPath = backgroundPath;
    }

    const updatedUser = UsersMapper.one(await UserModel.update(session.user.id, body));

    const token = Security.sign(updatedUser);

    session.user = updatedUser;
    session.token = token;

    await session.save();

    return { user: updatedUser, token: token };
  }
}

export default apiHandler(UsersHandler);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
