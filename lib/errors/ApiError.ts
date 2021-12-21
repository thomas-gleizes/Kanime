class ApiError {
  private _message: string;
  private _code: 404 | 400 | 500 | 401 | number;

  constructor(code, message) {
    this._message = message;
    this._code = code;
  }

  public get message(): string {
    return this._message;
  }

  public get code(): number {
    return this._code;
  }
}

export default ApiError;
