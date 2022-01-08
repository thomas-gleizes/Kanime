import type { NextApiRequest, NextApiResponse } from 'next';

import { DefaultErrorData, DefaultResponseData } from '@types';
import router from '@lib/routing/router';

interface Data extends DefaultResponseData {
}

interface Error extends DefaultErrorData {
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
  res.send({ success: true });
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}