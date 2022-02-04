import { User as UserModel } from '@prisma/client';

import { Mapper, User } from '@types';
import Moment from 'moment';

class UsersMapper implements Mapper<UserModel, [user: User, password: string]> {
  public one(resource: UserModel): [user: User, password: string] {
    if (resource) {
      const {
        password,
        is_admin,
        avatar_path,
        background_path,
        follow_count,
        follower_count,
        created_at,
        updated_at,
        ...rest
      } = resource;

      const user: User = {
        id: rest.id,
        email: rest.email,
        username: rest.username,
        isAdmin: is_admin,
        followCount: follow_count,
        followerCount: follower_count,
        avatarPath: avatar_path,
        backgroundPath: background_path,
        createdAt: Moment(created_at).format('DD-MM-YYYY HH:mm:ss'),
        updatedAt: Moment(created_at).format('DD-MM-YYYY HH:mm:ss'),
      };

      return [user, password];
    } else return [null, null];
  }

  public many(resources: Array<UserModel>): Array<[user: User, password: string]> {
    return resources.map(this.one);
  }
}

export default new UsersMapper();
