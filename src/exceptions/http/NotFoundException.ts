import { HttpException } from 'next-api-decorators';
import HttpStatus from 'resources/HttpStatus';

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(HttpStatus.NOT_FOUND, message || 'Not Found');
  }
}
