import { Get, Query, ParseNumberPipe } from 'next-api-decorators'
import { Visibility } from '@prisma/client'

import type { Session } from 'app/session'
import { apiHandler } from 'services/handler.service'
import { animeModel, entryModel, userFollowModel } from 'models'
import { entriesMapper } from 'mappers'
import { errorMessage } from 'resources/constants'
import { PrismaEntryStatus } from 'resources/prisma'
import ApiHandler from 'class/ApiHandler'
import { GetSession } from 'decorators/getSession.decorator'
import { QueryEntryListDto } from 'dto'
import { NotFoundException } from 'exceptions/http'

class AnimesEntriesHandler extends ApiHandler {
  @Get()
  async showEntries(
    @Query('id', ParseNumberPipe) id: number,
    @Query() query: QueryEntryListDto,
    @GetSession() session: Session
  ): Promise<ShowAnimeEntriesResponse> {
    const isExist = await animeModel.isExist(id)

    if (!isExist) throw new NotFoundException(errorMessage.ANIME_NOT_FOUND)

    const visibility: Visibility[] = ['public']
    if (session?.user)
      if (session.user.id === id) visibility.push('limited', 'private')
      else {
        const isFriends = await userFollowModel.isFriends(session.user.id, id)

        if (isFriends) visibility.push('limited')
      }

    let orderBy

    if (query.orderBy)
      for (const [key, value] of Object.entries(query.orderBy))
        orderBy = { field: key, order: value }

    const entries = await entryModel.getByAnimes(
      id,
      visibility,
      query.status as PrismaEntryStatus,
      orderBy,
      { ...query }
    )

    return { success: true, entries: entriesMapper.many(entries) }
  }
}

export default apiHandler(AnimesEntriesHandler)
