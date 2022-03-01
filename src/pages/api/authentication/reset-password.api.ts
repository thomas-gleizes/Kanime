import { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import Security from 'services/security.service';
import { withSessionApi } from 'services/session.service';
import SchemaError from 'class/error/SchemaError';
import ApiError from 'class/error/ApiError';
import { resetPasswordSchema } from 'ressources/validations';
import { UserModel } from 'models';

handler.patch(async (req: NextApiRequest, res: NextApiResponse<DefaultResponse>) => {
  const { body } = req;

  try {
    await resetPasswordSchema.validate(body);
  } catch (err) {
    throw new SchemaError(err);
  }

  const user = await UserModel.checkResetPasswordToken(body.token);
  if (!user) throw new ApiError(404, 'token not found');

  const hash = Security.sha256(body.newPassword + user.username);

  await UserModel.resetPassword(user.id, hash);

  res.send({ success: true });
});

export default withSessionApi(handler);
