import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';

import { DefaultErrorData, DefaultResponseData } from '@types';
import { verifyUser, withSessionApi } from '@services/session';
import router from '@lib/routing/router';
import { UserModel } from '@models';
import { ApiError } from '@errors';

interface Data extends DefaultResponseData {}

interface Error extends DefaultErrorData {}

// var matches = string.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),

router.patch(
  verifyUser,
  async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
    const { body } = req;
    const { id } = req.session.user;

    const path = `/media/users/${id.toString().split('').join('/')}`;

    if (body.avatar) {
      if (Buffer.byteLength(body.avatar, 'utf8') >= 1000000)
        throw new ApiError(400, 'avatar is to big');

      await new Promise((resolve, reject) =>
        fs.writeFile(`${path}/avatar.jpg`, new Buffer(body.avatar, 'base64'), (err) => {
          if (err) reject(err);
          resolve(null);
        })
      );
      body.backgroundPath = `${path}/avatar.jpg`;
    }

    if (body.background) {
      if (Buffer.byteLength(body.background, 'utf8') >= 1000000)
        throw new ApiError(400, 'avatar is to big');

      await new Promise((resolve, reject) =>
        fs.writeFile(
          `${path}/background.jpg`,
          new Buffer(body.avatar, 'base64'),
          (err) => {
            if (err) reject(err);
            resolve(null);
          }
        )
      );
      body.backgroundPath = `${path}/background.jpg`;
    }

    const user = await UserModel.update(id, body);

    res.status(200).send({ success: true, params: user });
  }
);

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
