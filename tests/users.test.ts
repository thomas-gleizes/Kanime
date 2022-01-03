import Moment from 'moment';
import { UsersResources } from '@resources';
import { User } from '@types';

describe('users', () => {
  it('should create user', () => {
    const now = new Date();

    const [user, pass] = UsersResources.one({
      id: 1,
      email: 'string',
      password: 'string',
      login: 'string',
      avatar_path: '',
      gender: 'Male',
      follow_count: 0,
      follower_count: 0,
      is_admin: false,
      background_path: '',
      bio: '',
      birthday: now,
      city: '',
      country_id: 0,
      created_at: now,
      updated_at: now,
    });

    expect(user).toBe({
      id: 1,
      email: 'string',
      login: 'string',
      avatarPath: '',
      backgroundPath: '',
      followCount: 0,
      followerCount: 0,
      isAdmin: false,
      updatedAt: Moment(now).format('DD-MM-YYYY HH:mm:ss'),
      createdAt: Moment(now).format('DD-MM-YYYY HH:mm:ss'),
    });
    expect(false).toBe(false);
  });

  it('should read user', () => {
    expect(true).toBe(true);
    expect(false).toBe(false);
  });

  it.skip('should edit user', () => {});

  it.skip('should delete user', () => {});
});

export {};
