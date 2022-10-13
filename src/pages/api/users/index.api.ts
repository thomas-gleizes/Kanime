import * as fs from 'fs';
import { Body, Get, Patch, Query, ValidationPipe } from 'next-api-decorators';

import type { Session } from 'app/session';
import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import Security from 'services/security.service';
import { usersMapper } from 'mappers';
import { userModel } from 'models';
import { defaultUsersMedia, publicPath } from 'resources/constants';
import { GetSession, AuthGuard } from 'decorators';
import { QueryParamsDto, UpdateUserDto } from 'dto';

class UsersHandler extends ApiHandler {
  @Get()
  async get(
    @Query(ValidationPipe) params: QueryParamsDto
  ): Promise<ShowUsersListResponse> {
    const users = await userModel.findAll();

    return { success: true, users: usersMapper.many(users) };
  }

  @Patch()
  @AuthGuard()
  async update(
    @Body(ValidationPipe) body: UpdateUserDto,
    @GetSession() session: Session
  ): Promise<UpdateUserResponse> {
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

    const updatedUser = usersMapper.one(await userModel.update(session.user.id, body));

    const token = Security.sign(updatedUser);

    session.user = updatedUser;
    session.token = token;

    await session.save();

    return { success: true, user: updatedUser, token: token };
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
