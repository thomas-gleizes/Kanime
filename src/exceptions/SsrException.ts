import { Exception } from './Exception';

export class SsrException extends Exception {
  private readonly _statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this._statusCode = statusCode;
  }

  public parse(): { statusCode: number; message: string } {
    return {
      statusCode: this._statusCode,
      message: this.message,
    };
  }

  public get statusCode(): number {
    return this._statusCode;
  }
}
