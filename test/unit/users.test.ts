import { UserModel } from '@models';
import Security from '@services/security';
import { expect } from '@jest/globals';
import { defaultUsersMedia } from '@lib/constants';

describe('users', () => {
  beforeAll(async () => {
    await UserModel.deleteAll();
  });

  it('should user table is empty', async () => {
    expect(await UserModel.count()).toBe(0);
  });

  it('should create user', async () => {
    const password: string = 'password';
    const login: string = 'Kalat';
    const email: string = 'kalat@email.fr';

    const user = await UserModel.create({
      login: login,
      email: email,
      password: await Security.hash(password),
    });

    expect(user).toBeDefined();

    expect(await Security.compare(password, user.password)).toBeTruthy();
    expect(user.is_admin).toBeFalsy();
    expect(user.follow_count).toBe(0);
    expect(user.follower_count).toBe(0);
    expect(user.avatar_path).toBe(defaultUsersMedia.avatar);
    expect(user.background_path).toBe(defaultUsersMedia.background);
    expect(user.gender).toBe('Secret');
  });
});

export {};
