import type { NextApiRequest, NextApiResponse } from 'next';

import { DefaultErrorData, DefaultResponseData } from '@types';
import router from '@lib/router';
import connexion from '@lib/connexion';
import UsersResources from '@lib/resources/UsersResources';
import ApiError from '@lib/errors/ApiError';

interface Data extends DefaultResponseData {}

interface Error extends DefaultErrorData {
  message: string;
}

router.get = async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
  const { id } = req.query;

  const users = UsersResources.many(
    await connexion.user.findMany({
      where: {
        followers: { some: { follower_id: +id } },
      },
    })
  ).map(([user]) => user);

  res.send({ success: true, data: users });
};

router.post = async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
  const { id } = req.query;
  const user = { id: 1 }; // TODO ICI

  try {
    await connexion.userFollow.create({
      data: {
        follower_id: +user.id,
        follow_id: +id,
      },
    });

    res.status(201).send({ success: true });
  } catch (e) {
    throw new ApiError('you already follow this user !');
  }
};

router.delete = async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
  const { id } = req.query;
  const user = { id: 1 }; // TODO ICI COMME LA HAUT

  try {
    const test = await connexion.userFollow.delete({
      where: {
        follower_id: +user.id,
        follow_id: +id,
      },
    });

    res.status(200).send({ success: true });
  } catch (e) {
    res.status(400).send({ data: undefined, message: "you didn't follow this user" });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
