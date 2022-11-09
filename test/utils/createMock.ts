import {
  createRequest,
  createResponse,
  RequestOptions,
  ResponseOptions
} from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next'

declare type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
declare type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>

export default function (
  requestOptions?: RequestOptions,
  responseOptions?: ResponseOptions
): [ApiRequest, ApiResponse] {
  return [
    createRequest<ApiRequest>(requestOptions),
    createResponse<ApiResponse>(responseOptions)
  ]
}
