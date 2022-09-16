import { Get, Query, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { usersMapper } from 'mappers';
import { userModel } from 'models';
import { SearchUserQueryDto } from 'dto';

class SearchUserHandler extends ApiHandler {
  @Get()
  async search(@Query(ValidationPipe) params: SearchUserQueryDto) {
    const users = await userModel
      .search(params.query, params)
      .then((users) => usersMapper.many(users));

    return { users };
  }
}

export default apiHandler(SearchUserHandler);
