class ApiError extends Error {
  private readonly _code: 404 | 400 | 500 | 401 | number;

  constructor(code, message) {
    super(message);
    this._code = code;
  }

  get code(): number {
    return this._code;
  }
}

export default ApiError;
