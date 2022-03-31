import { ApiRequest, ApiResponse } from 'app/next';
import { Country } from '@prisma/client';

import { apiHandler } from 'services/handler.service';
import { CountryModel } from 'models';
import { withSessionApi } from 'services/session.service';

interface Data extends DefaultResponseData {
  countries: Array<Country>;
}

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<Data>) => {
  const countries = await CountryModel.all();

  res.json({ success: true, countries });
});

export default withSessionApi(handler);
