import { Get, NotFoundException, Param, ParseNumberPipe } from 'next-api-decorators';
import { Visibility } from '@prisma/client';

import ApiHandler from 'class/ApiHandler';
import { apiHandler } from 'services/handler.service';
import { entryModel, userFollowModel } from 'models';
import { entriesMapper } from 'mappers';
import { GetSession } from 'decorators';

class EntryUserHandler extends ApiHandler {
  @Get()
  async showEntryUser(
    @Param('id', ParseNumberPipe) id: number,
    @GetSession() session
  ): Promise<ShowEntryUserResponse> {
    const entry = await entryModel
      .findWithUser(id)
      .then((entry) => entriesMapper.one(entry));

    if (!entry) throw new NotFoundException('entry not found');
    if (entry.visibility !== Visibility.public) {
      if (!session) throw new NotFoundException('entry not found');

      if (entry.visibility === Visibility.limited) {
        const isFriends = await userFollowModel.isFriends(session.user.id, id);

        if (!isFriends) throw new NotFoundException('Entry not found');
      } else if (entry.user.id !== session.id)
        throw new NotFoundException('Entry not found');
    }

    return { success: true, user: entry.user };
  }
}

export default apiHandler(EntryUserHandler);
