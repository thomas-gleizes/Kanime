import { createMocks } from 'node-mocks-http'

import { ApiRequest, ApiResponse } from 'app/mock'
import AnimesHandler from 'pages/api/animes/index.api'

describe('Animes Handler', () => {
  it('should get some animes', async () => {
    const { req, res } = createMocks<ApiRequest, ApiResponse>({
      url: '/api/animes',
      method: 'GET'
    })

    await AnimesHandler(req, res)

    expect(res._getStatusCode()).toEqual(200)
  })
})
