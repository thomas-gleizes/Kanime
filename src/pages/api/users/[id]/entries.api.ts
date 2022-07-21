import { Visibility } from '@prisma/client';

import { ApiRequest, ApiResponse } from 'next/app';
import { PrismaEntryStatus } from 'prisma/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { EntryModel, UserFollowModel } from 'models';
import { EntriesMapper } from 'mappers';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<UsersEntriesResponse>) => {
  const { query, session } = req;

  const visibility: Visibility[] = ['public'];
  if (session.user)
    if (session.user.id === +query.id) visibility.push('limited', 'private');
    else {
      const [one, two] = await Promise.all([
        UserFollowModel.isFollow(session.user.id, +query.id),
        UserFollowModel.isFollow(+query.id, session.user.id),
      ]);

      if (one && two) visibility.push('limited');
    }

  let orderBy = undefined;

  if (query.orderBy)
    for (const [key, value] of Object.entries(query.orderBy))
      orderBy = { field: key, order: value };

  const entries = await EntryModel.getByUser(
    +query.id,
    visibility,
    query.status as PrismaEntryStatus,
    orderBy,
    { ...query }
  );

  return res.send({ success: true, entries: EntriesMapper.many(entries) });
});

export default withSessionApi(handler);
