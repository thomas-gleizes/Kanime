import { expect } from '@jest/globals';

describe('setup', () => {
  it('should create env', () => {
    expect(process.env.NODE_ENV).toBe('test');

    expect(process.env.DATABASE_URL).toBeDefined();
    expect(process.env.SECRET_TOKEN).toBeDefined();
    expect(process.env.PASS_SEED).toBeDefined();

    expect(process.env.NEXT_PUBLIC_APP_NAME).toBeDefined();
    expect(process.env.NEXT_PUBLIC_APP_URL).toBeDefined();
  });
});
