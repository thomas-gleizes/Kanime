import { createMocks } from 'node-mocks-http';
import httpStatus from 'resources/HttpStatus';

import testApiRoute from '../../../src/pages/api/test.api';

describe('api should work', () => {
  it('should work with GET method', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    expect(req.method).toBe('GET');

    // @ts-ignore
    await testApiRoute(req, res);

    expect(res._getStatusCode()).toBe(httpStatus.OK);
    expect(res._getData()).toBe({ name: 'John Doe' });
  });

  it('should work with POST method', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { name: 'Janne Doe' },
    });

    expect(req.method).toBe('POST');

    // @ts-ignore
    await testApiRoute(req, res);

    expect(res._getStatusCode()).toBe(httpStatus.CREATED);
    expect(res._getData()).toBe({ name: 'Janne Doe' });
  });
});
