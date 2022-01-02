import { UserModel } from '@models';
import Security from '@services/security';

describe('users', () => {
  beforeEach(() => {
    console.log('each');
  });

  beforeAll(() => {
    console.log('all');
  });

  it.skip('should create user', async () => {
    await UserModel.create({
      login: 'Kalat.test',
      email: 'Kalat@test.fr',
      password: await Security.hash('azerty'),
    });
  });

  it.skip('should read user', async () => {});

  it.skip('should edit user', async () => {});

  it.skip('should delete user', async () => {});
});
