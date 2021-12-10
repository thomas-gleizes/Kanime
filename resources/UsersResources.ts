import { User as UserModel } from '@prisma/client';
import { Resources, User } from '../types';

class UsersResources implements Resources<UserModel, [user: User, password: string]> {
  public one(resource: UserModel): [user: User, password: string] {
    if (resource) {
      const { password, ...user } = resource;

      return [user, password];
    } else return [null, null];
  }

  public many(resources: Array<UserModel>): Array<[user: User, password: string]> {
    return resources.map(this.one);
  }
}

export default new UsersResources();
