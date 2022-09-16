import { Get, Query, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { countryModel } from 'models';
import { QueryParamsDto } from 'dto';

class CountriesHandler extends ApiHandler {
  @Get()
  async show(@Query(ValidationPipe) params: QueryParamsDto) {
    const countries = await countryModel.all();

    return { countries };
  }
}

export default apiHandler(CountriesHandler);
