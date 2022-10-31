import { HttpException } from 'next-api-decorators'
import HttpStatus from 'resources/HttpStatus'

export class ForbiddenException extends HttpException {
  constructor(message?: string) {
    super(HttpStatus.FORBIDDEN, message || 'Forbidden')
  }
}
