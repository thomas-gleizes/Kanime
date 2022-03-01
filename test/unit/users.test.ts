import { Gender } from '@prisma/client';
import { UserModel } from '../../src/models';
import Security from '../../src/services/security.service';
import { defaultUsersMedia } from '../../src/ressources/constants';

describe('users model', () => {
  let userId: number = null;

  beforeAll(async () => {
    await UserModel.deleteAll();
  });

  it('should user table is empty', async () => {
    expect(await UserModel.count()).toBe(0);
  });

  it('should create user', async () => {
    const password: string = 'password';
    const username: string = 'Kalat';
    const email: string = 'kalat@email.fr';

    const user = await UserModel.create({
      username: username,
      email: email,
      password: Security.sha256(password),
    });

    expect(user).toBeDefined();

    userId = user.id;

    expect(Security.compare(password, user.password)).toBeTruthy();
    expect(user.is_admin).toBeFalsy();
    expect(user.follow_count).toBe(0);
    expect(user.follower_count).toBe(0);
    expect(user.avatar_path).toBe(defaultUsersMedia.avatar);
    expect(user.background_path).toBe(defaultUsersMedia.background);
    expect(user.gender).toBe('Secret');
  });

  it('should update user', async () => {
    const bio: string = 'Ceci est une description de test';
    const gender: Gender = 'Male';
    const birthDay: Date = new Date('1999-05-21');
    const city: string = 'Montpellier';

    const updateUser = await UserModel.update(userId, {
      avatarPath: '',
      backgroundPath: '',
      birthday: birthDay,
      city: city,
      bio: bio,
      gender: gender,
    });

    expect(updateUser.bio).toBe(bio);
    expect(updateUser.city).toBe(city);
    expect(updateUser.gender).toBe(gender);
    expect(updateUser.birthday.toString()).toBe(birthDay.toString());
  });
});
