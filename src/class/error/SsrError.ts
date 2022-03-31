class SsrError {
  private readonly _message: string;
  private readonly _statusCode: number;

  constructor(statusCode: number, message: string) {
    this._message = message;
    this._statusCode = statusCode;
  }

  public parse(): { statusCode: number; message: string } {
    return {
      statusCode: this._statusCode,
      message: this._message,
    };
  }
}

export default SsrError;
