import { Get, ParseNumberPipe, Query, ValidationPipe } from 'next-api-decorators';
import { Visibility } from '@prisma/client';

import { PrismaEntryStatus } from 'prisma/app';
import ApiHandler from 'class/ApiHandler';
import { apiHandler } from 'services/handler.service';
import { entryModel, userFollowModel } from 'models';
import { entriesMapper } from 'mappers';
import { GetSession } from 'decorators';
import { QueryEntryListDto } from 'dto';


class UserEntriesHandler extends ApiHandler {
  @Get()
  async get(
    @Query('id', ParseNumberPipe) id: number,
    @Query(ValidationPipe) query: QueryEntryListDto,
    @GetSession() session
  ): Promise<ShowUserEntriesResponse> {
    const visibility: Visibility[] = ['public'];
    if (session?.user)
      if (session.user.id === id) visibility.push('limited', 'private');
      else {
        const isFriends = await userFollowModel.isFriends(session.user.id, id);

        if (isFriends) visibility.push('limited');
      }

    let orderBy = undefined;

    if (query.orderBy)
      for (const [key, value] of Object.entries(query.orderBy))
        orderBy = { field: key, order: value };

    const entries = await entryModel.getByUser(
      id,
      visibility,
      query.status as PrismaEntryStatus,
      orderBy,
      { ...query }
    );

    return { success: true, entries: entriesMapper.many(entries) };
  }
}

export default apiHandler(UserEntriesHandler);
