class SsrError {
  private readonly _message: string;
  private readonly _statusCode: number;

  constructor(message: string, statusCode: number) {
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
