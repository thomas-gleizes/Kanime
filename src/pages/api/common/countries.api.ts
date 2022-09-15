import { Get, Query, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { CountryModel } from 'models';
import { QueryParamsDto } from 'dto';

class CountriesHandler extends ApiHandler {
  @Get()
  async show(@Query(ValidationPipe) params: QueryParamsDto) {
    const countries = await CountryModel.all();

    return { countries };
  }
}

export default apiHandler(CountriesHandler);
