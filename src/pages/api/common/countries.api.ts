import { ApiRequest, ApiResponse } from 'next/app';
import { Country } from '@prisma/client';

import { apiHandler } from 'services/handler.service';
import { CountryModel } from 'models';
import { withSessionApi } from 'services/session.service';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<{ countries: Country[] }>) => {
  const countries = await CountryModel.all();

  return res.json({ success: true, countries });
});

export default withSessionApi(handler);
