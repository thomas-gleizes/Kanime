import { Get, ParseNumberPipe, Query } from 'next-api-decorators'

import type { Session } from 'app/session'
import ApiHandler from 'class/ApiHandler'
import { entryModel } from 'models'
import { AuthGuard } from 'decorators/authGuard.decorator'
import { GetSession } from 'decorators/getSession.decorator'
import { entriesMapper } from 'mappers'
import { NotFoundException } from 'exceptions/http'
import { handleApi } from 'services/handler.service'

class AnimesEntryHandler extends ApiHandler {
  @Get()
  @AuthGuard()
  async showEntry(
    @Query('id', ParseNumberPipe) id: number,
    @GetSession() session: Session
  ): Promise<any> {
    const entry = await entryModel.findByAnimeAndUser(id, session.user.id)

    if (!entry) throw new NotFoundException('entry not found')

    return {
      success: true,
      entry: entriesMapper.one(entry)
    }
  }
}

export default handleApi(AnimesEntryHandler)
