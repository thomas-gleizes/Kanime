import { NextApiRequest, NextApiResponse } from 'next';

import handler from '@lib/routing';
import { withSessionApi } from '@services/session.service';
import { UserModel } from '@models';
import { ApiError } from '@errors';
import SecurityService from '@services/security.service';
import { DAY } from '@lib/constants';

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  const user = await UserModel.findByEmail(email);

  if (!user) throw new ApiError(404, 'email user not found');

  if (
    user.last_ask_reset_password &&
    user.last_ask_reset_password.getTime() + DAY > Date.now()
  )
    throw new ApiError(400, 'you can ask to change your password only one time per day');

  const hash = SecurityService.sha256(user.password + user.username);
  await UserModel.updateResetPasswordToken(user.id, hash);

  //TODO SEND email with new services for email

  res.send({ success: true });
});

export default withSessionApi(handler);
