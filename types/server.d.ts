declare type responseCode = 404 | 400 | 500 | 401 | number

declare type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

interface ErrorPage {
  code: responseCode
  message: string
}

declare interface ApiResponse {
  success: true
}

declare interface ApiResponseList<T> extends ApiResponse {
  meta: {
    total: number
    count: number
  }
  records: T
}
