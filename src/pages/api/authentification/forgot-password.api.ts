import { ApiRequest, ApiResponse } from 'next/app';
import Security from 'services/security.service';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { UserModel } from 'models';
import { ApiError } from 'errors';
import { DAY } from 'resources/constants';
import HttpStatus from 'resources/HttpStatus';

const handler = apiHandler();

handler.patch(async (req: ApiRequest, res: ApiResponse) => {
  const { email } = req.body;

  const user = await UserModel.findByEmail(email);

  if (!user) throw new ApiError(HttpStatus.NOT_FOUND, 'email user not found');

  if (
    user.last_ask_reset_password &&
    user.last_ask_reset_password.getTime() + DAY > Date.now()
  )
    throw new ApiError(
      HttpStatus.BAD_REQUEST,
      'you can ask to change your password only one time each 24 hours'
    );

  const hash = Security.sha512(user.password + user.username);
  await UserModel.updateResetPasswordToken(user.id, hash);

  //TODO SEND email with a new services for email

  return res.json({ success: true });
});

export default withSessionApi(handler);
