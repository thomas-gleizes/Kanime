import { ApiRequest, ApiResponse } from 'next/app';
import Security from 'services/security.service';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { UserModel } from 'models';
import { ApiError } from 'errors';
import { DAY } from 'resources/constants';

const handler = apiHandler();

handler.patch(async (req: ApiRequest, res: ApiResponse) => {
  const { email } = req.body;

  const user = await UserModel.findByEmail(email);

  if (!user) throw new ApiError(404, 'email user not found');

  if (
    user.last_ask_reset_password &&
    user.last_ask_reset_password.getTime() + DAY > Date.now()
  )
    throw new ApiError(400, 'you can ask to change your password only one time per day');

  const hash = Security.sha256(user.password + user.username);
  await UserModel.updateResetPasswordToken(user.id, hash);

  //TODO SEND email with a new services for email

  res.json({ success: true });
});

export default withSessionApi(handler);
