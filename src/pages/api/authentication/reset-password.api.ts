import { ApiRequest, ApiResponse } from 'app/next';
import Security from 'services/security.service';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { ApiError, SchemaError } from 'class/error';
import { resetPasswordSchema } from 'resources/validations';
import { UserModel } from 'models';

const handler = apiHandler();

handler.patch(async (req: ApiRequest, res: ApiResponse) => {
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

  res.json({ success: true });
});

export default withSessionApi(handler);
