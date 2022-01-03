import type { NextApiRequest, NextApiResponse } from 'next';
import { Country } from '@prisma/client';

import router from '@lib/routing/router';
import { CountryModel } from '@models';
import { DefaultResponseData } from '@types';

interface Data extends DefaultResponseData {
  countries: Array<Country>;
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const countries = await CountryModel.all();

  res.send({ success: true, countries });
});

export default function (req, res) {
  router.handler(req, res);
}
