import AnimesHandler from '../../../src/pages/api/animes/index.api';
import { createMocks } from 'node-mocks-http';

describe('test', () => {
  it('should create private env', () => {
    const { req, res } = createMocks({
      url: '/api/animes',
      method: 'GET',
    });

    // @ts-ignore
    AnimesHandler(req, res);
    expect(res._getStatusCode()).toBe(200);

    console.log(res._getData());
  });
});
