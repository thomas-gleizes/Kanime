import { Get, Param, ParseNumberPipe } from 'next-api-decorators'
import { Visibility } from '@prisma/client'

import type { Session } from 'app/session'
import ApiHandler from 'class/ApiHandler'
import { apiHandler } from 'services/handler.service'
import { entryModel, userFollowModel } from 'models'
import { usersMapper } from 'mappers'
import { GetSession } from 'decorators'
import { NotFoundException } from 'exceptions/http'

class EntryUserHandler extends ApiHandler {
  @Get()
  async showEntryUser(
    @Param('id', ParseNumberPipe) id: number,
    @GetSession() session: Session
  ): Promise<ShowEntryUserResponse> {
    const entry = await entryModel.findWithUser(id)

    if (!entry) throw new NotFoundException('entry not found')
    if (entry.visibility !== Visibility.public) {
      if (!session) throw new NotFoundException('entry not found')

      if (entry.visibility === Visibility.limited) {
        const isFriends = await userFollowModel.isFriends(session.user.id, id)

        if (!isFriends) throw new NotFoundException('Entry not found')
      } else if (entry.userId !== session.user.id)
        throw new NotFoundException('Entry not found')
    }

    return { success: true, user: usersMapper.one(entry.user) }
  }
}

export default apiHandler(EntryUserHandler)
