import { NextApiRequest, NextApiResponse } from 'next';

import handler from '@lib/routing';
import { withSessionApi } from '@services/session';
import { UserModel } from '@models';
import { ApiError } from '@errors';
import Security from '@services/security';

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  const user = await UserModel.findByEmail(email);

  if (!user) throw new ApiError(404, 'email user not found');

  const token = await Security.hash(user.password + user.username);

  await UserModel.updateResetPasswordToken(user.id, token);

  //TODO SEND email with new services for email

  res.send({ success: true });
});

export default withSessionApi(handler);
