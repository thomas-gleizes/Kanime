class SsrError extends Error {
  private readonly _message: string;
  private readonly _statusCode: number;

  constructor(statusCode: number, message: string) {
    super();

    this._message = message;
    this._statusCode = statusCode;
  }

  public parse(): { statusCode: number; message: string } {
    return {
      statusCode: this._statusCode,
      message: this._message,
    };
  }

  public get message(): string {
    return this._message;
  }

  public get statusCode(): number {
    return this._statusCode;
  }
}

export default SsrError;
