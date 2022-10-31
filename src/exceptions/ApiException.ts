import { Exception } from './Exception'
import HttpStatus from 'resources/HttpStatus'

export class ApiException extends Exception {
  private readonly _data: any
  private readonly _statusCode: HttpStatus

  constructor(message: string, statusCode: HttpStatus, data: any) {
    super(message)

    this._statusCode = statusCode
    this._data = data
  }

  get data(): any {
    return this._data
  }

  get statusCode(): HttpStatus {
    return this._statusCode
  }
}
