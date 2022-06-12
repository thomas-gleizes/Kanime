import HttpStatus from 'resources/HttpStatus';

class ApiError extends Error {
  private readonly _code: HttpStatus;

  constructor(code: HttpStatus, message: string) {
    super(message);
    this._code = code;
  }

  get code(): HttpStatus {
    return this._code;
  }
}

export default ApiError;
