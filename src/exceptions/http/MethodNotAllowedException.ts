import { HttpException } from 'next-api-decorators'
import HttpStatus from 'resources/HttpStatus'

export class MethodNotAllowedException extends HttpException {
  constructor(message?: string) {
    super(HttpStatus.METHOD_NOT_ALLOWED, message || 'Method Not Allowed')
  }
}
