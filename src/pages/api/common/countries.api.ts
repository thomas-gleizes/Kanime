import { ApiRequest, ApiResponse } from 'app/next';
import { Country } from '@prisma/client';

import handler from 'services/handler.service';
import { CountryModel } from 'models';
import { withSessionApi } from 'services/session.service';

interface Data extends DefaultResponseData {
  countries: Array<Country>;
}

handler.get(async (req: ApiRequest, res: ApiResponse<Data>) => {
  const countries = await CountryModel.all();

  res.send({ success: true, countries });
});

export default withSessionApi(handler);
