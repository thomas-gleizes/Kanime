import { NextApiRequest, NextApiResponse } from 'next';

import { ResDefaultError, ResRegister } from '@types';
import handler from '@lib/routing';
import Security from '@services/security';
import { UserModel } from '@models';
import { UsersMapper } from '@mapper';
import { withSessionApi } from '@services/session';
import { ApiError } from '@errors';

handler.post(
  async (req: NextApiRequest, res: NextApiResponse<ResRegister | ResDefaultError>) => {
    const { body: userData, session } = req;

    // const error = await registerSchema.validate(userData).catch((error) => error);
    // if (error) throw new SchemaError(400, error);

    session.destroy();

    const users = await UserModel.findByEmailOrUsername(
      userData.email,
      userData.username
    );

    if (users.length) {
      let key = 'username';
      if (users[0].email === userData.email) key = 'email';

      throw new ApiError(400, `${key} already Fexist`);
    }

    const [user] = UsersMapper.one(
      await UserModel.create({
        username: userData.username,
        email: userData.email,
        password: await Security.hash(userData.password + userData.username),
      })
    );

    const token = Security.sign(user);

    session.user = user;
    session.token = token;
    await session.save();

    res.status(201).send({ success: true, user: user, token: token });
  }
);

export default withSessionApi(handler);
