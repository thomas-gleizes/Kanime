import { responseCode } from '@types';

class ErrorPage {
  private statusCode: responseCode;
  private title: string;

  constructor(code, message) {
    this.statusCode = code;
    this.title = message;
  }
}

export default ErrorPage;
