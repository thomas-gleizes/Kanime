import { HttpException } from 'next-api-decorators'
import HttpStatus from 'resources/HttpStatus'

export class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super(HttpStatus.UNAUTHORIZED, message || 'Unauthorized')
  }
}
