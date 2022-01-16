import { responseCode } from '@types';

class ErrorPage {
  private readonly _statusCode: responseCode;
  private readonly _title: string;

  public constructor(code: responseCode, message: string) {
    this._statusCode = code;
    this._title = message;
  }

  get statusCode(): responseCode {
    return this._statusCode;
  }

  get title(): string {
    return this._title;
  }

  static create(
    code: responseCode,
    message: string
  ): { statusCode: responseCode; title: string } {
    const error = new ErrorPage(code, message);

    return { statusCode: error.statusCode, title: error.title };
  }
}

export default ErrorPage;
