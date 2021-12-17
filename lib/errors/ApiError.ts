class ApiError {
  private _message: string;
  private _code: '404' | '400' | '500' | string;

  constructor(code, message) {
    this._message = message;
    this._code = code;
  }
}

export default ApiError;
