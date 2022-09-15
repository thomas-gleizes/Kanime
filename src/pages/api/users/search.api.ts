import { Get, Query, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { UsersMapper } from 'mappers';
import { UserModel } from 'models';
import { SearchUserQueryDto } from 'dto';

class SearchUserHandler extends ApiHandler {
  @Get()
  async search(@Query(ValidationPipe) params: SearchUserQueryDto) {
    const users = await UserModel.search(params.query, params).then((users) =>
      UsersMapper.many(users)
    );

    return { users };
  }
}

export default apiHandler(SearchUserHandler);
