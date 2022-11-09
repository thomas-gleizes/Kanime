import AnimesHandler from 'pages/api/animes/index.api'
import createMock from '../../utils/createMock'

describe('Animes Handler', () => {
  it('should get some animes', async () => {
    const [request, response] = createMock({ path: '/api/animes', method: 'GET' })

    await AnimesHandler(request, response)

    expect(response._getStatusCode()).toEqual(200)
  })
})
