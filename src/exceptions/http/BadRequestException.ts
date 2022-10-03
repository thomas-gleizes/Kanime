import { HttpException } from 'next-api-decorators';
import HttpStatus from 'resources/HttpStatus';

export class BadRequestException extends HttpException {
  constructor(message?: string) {
    super(HttpStatus.BAD_REQUEST, message || 'Bad Request');
  }
}
