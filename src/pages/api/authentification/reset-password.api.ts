import { ApiRequest, ApiResponse } from 'next/app';
import { UserModel } from 'models';
import Security from 'services/security.service';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import HttpStatus from 'resources/HttpStatus';
import { resetPasswordSchema } from 'resources/validations';
import { ApiError, SchemaError } from 'errors';

const handler = apiHandler();

handler.patch(async (req: ApiRequest, res: ApiResponse) => {
  const { body } = req;

  try {
    await resetPasswordSchema.validate(body);
  } catch (err) {
    throw new SchemaError(err);
  }

  const user = await UserModel.checkResetPasswordToken(body.token);
  if (!user) throw new ApiError(HttpStatus.NOT_FOUND, 'token not found');

  await UserModel.resetPassword(
    user.id,
    Security.sha512(body.newPassword + user.username)
  );

  return res.json({ success: true });
});

export default withSessionApi(handler);
