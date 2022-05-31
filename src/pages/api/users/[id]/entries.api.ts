import { ApiRequest, ApiResponse } from 'next/app';
import { Visibility } from 'app/model';

import { PrismaVisibility } from 'resources/prisma';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { EntryModel, UserFollowModel } from 'models';
import { EntriesMapper } from 'mappers';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<any>) => {
  const { id } = req.query;
  const { user } = req.session;

  const visibility: Visibility[] = PrismaVisibility.public as Visibility;
  if (user.id)
    if (user.id === +id)
      visibility.push(PrismaVisibility.limited, PrismaVisibility.private);
    else {
      const [one, two] = await Promise.all([
        UserFollowModel.isFollow(user.id, +id),
        UserFollowModel.isFollow(+id, user.id),
      ]);

      if (one && two) visibility.push(PrismaVisibility.limited);
    }

  const entries = EntriesMapper.many(await EntryModel.getByUser(+id, visibility));

  res.send({ success: true, entries });
});

export default withSessionApi(handler);
