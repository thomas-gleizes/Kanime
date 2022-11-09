import testApiRoute from 'pages/api/test.api'
import httpStatus from 'resources/HttpStatus'
import createMock from '../../utils/createMock'

describe('api should work', () => {
  it('should work with GET method', async () => {
    const [request, response] = createMock({ path: '/api/response', method: 'GET' })

    expect(request.method).toEqual('GET')

    await testApiRoute(request, response)

    expect(response._getStatusCode()).toEqual(httpStatus.OK)
    expect(response._getData()).toEqual({ success: true, name: 'John Doe' })
  })

  it('should work with POST method', async () => {
    const [request, response] = createMock({ path: '/api/response', method: 'POST' })

    expect(request.method).toEqual('POST')

    await testApiRoute(request, response)

    expect(response._getStatusCode()).toEqual(httpStatus.CREATED)
    expect(response._getData()).toEqual({ success: true, name: 'Janne Doe' })
  })
})
