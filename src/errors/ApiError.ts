class ApiError extends Error {
  private readonly _code: responseCode;

  constructor(code, message) {
    super(message);
    this._code = code;
  }

  get code(): number {
    return this._code;
  }
}

export default ApiError;
