import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import { CustomErrorData, CustomResponseData, User } from "../../../types";
import router from "../../../lib/router";
import Security from "../../../lib/security";
import usersResources from "../../../resources/UsersResources";

interface Data extends CustomResponseData {
  user: User;
}

interface Error extends CustomErrorData {
  key?: string;
}

const prisma = new PrismaClient();

router.post = async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
  const { body: userData } = req;

  const users: Array<any> = await prisma.user.findMany({
    where: {
      OR: [{ email: userData.email }, { login: userData.login }],
    },
  });

  if (users.length) {
    let key = "login";
    if (users[0].email === userData.email) key = "email";

    res.status(400).send({ error: "", key });
    throw new Error();
  }

  const [newUser, password]: [User, string] = usersResources.one(
    await prisma.user.create({
      data: {
        login: userData.login,
        email: userData.email,
        password: await Security.hash(userData.password),
      },
    })
  );

  newUser.token = Security.sign(newUser);

  res.send({ success: true, user: newUser });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
