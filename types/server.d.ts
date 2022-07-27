declare type responseCode = 404 | 400 | 500 | 401 | number;

declare type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface DefaultResponseData<T = any> {
  success: boolean;
  params?: any;
  debug?: T;
}

interface ApiResponseError {
  error: string;
}

interface ApiResponseSchemaError extends ApiResponseError {
  schemaError: any;
}

interface ErrorPage {
  code: responseCode;
  message: string;
}
