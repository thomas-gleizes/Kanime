import httpMocks, { createMocks } from 'node-mocks-http'

import { ApiRequest, ApiResponse } from 'app/mock'
import testApiRoute from 'pages/api/test.api'
import httpStatus from 'resources/HttpStatus'

describe('api should work', () => {
  it('should work with GET method', async () => {
    const req = httpMocks.createRequest<ApiRequest>({
      method: 'GET',
      url: '/api/test'
    })
    const res = httpMocks.createResponse<ApiResponse>()

    expect(req.method).toEqual('GET')

    await testApiRoute(req, res)

    expect(res._getStatusCode()).toEqual(httpStatus.OK)
    expect(res._getData()).toEqual({ success: true, name: 'John Doe' })
  })

  it('should work with POST method', async () => {
    const { req, res } = createMocks<ApiRequest, ApiResponse>({
      method: 'POST',
      url: '/api/test',
      body: { name: 'Janne Doe' }
    })

    expect(req.method).toEqual('POST')

    await testApiRoute(req, res)

    expect(res._getStatusCode()).toEqual(httpStatus.CREATED)
    expect(res._getData()).toEqual({ success: true, name: 'Janne Doe' })
  })
})
