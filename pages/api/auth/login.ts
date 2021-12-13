import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import { DefaultErrorData, DefaultResponseData, User } from '../../../types';
import router from '../../../lib/router';
import Security from '../../../lib/security';
import usersResources from '../../../lib/resources/UsersResources';

interface Data extends DefaultResponseData {
  user: User;
}

const prisma = new PrismaClient();

router.post = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | DefaultErrorData>
) => {
  const {
    body: { email, password },
  } = req;

  const [user, hash]: [User, string] = usersResources.one(
    await prisma.user.findUnique({
      where: { email },
    })
  );

  if (!user || !(await Security.compare(password, hash))) {
    res.status(401).send({ error: 'email/password wrong' });
    return;
  }

  user.token = Security.sign(user);

  res.send({ success: true, user });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
