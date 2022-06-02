import { Prisma, Visibility } from '@prisma/client';
import { ApiRequest, ApiResponse } from 'next/app';

import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { EntryModel, UserFollowModel } from 'models';
import { EntriesMapper } from 'mappers';
import { PrismaEntryInclude } from 'prisma/app';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<any>) => {
  const { id } = req.query;
  const { user } = req.session;

  const visibility: Visibility[] = ['public'];
  if (user.id)
    if (user.id === +id) visibility.push('limited', 'private');
    else {
      const [one, two] = await Promise.all([
        UserFollowModel.isFollow(user.id, +id),
        UserFollowModel.isFollow(+id, user.id),
      ]);

      if (one && two) visibility.push('limited');
    }

  const entries = EntriesMapper.many(
    await EntryModel.getByUser(+id, visibility, {
      include: req.query.include as PrismaEntryInclude,
    })
  );

  res.send({ success: true, entries });
});

export default withSessionApi(handler);
