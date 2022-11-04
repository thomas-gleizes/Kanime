import { Exception } from './Exception'

export class SsrException extends Exception {
  private readonly _statusCode: number
  private readonly _name: string
  private readonly _message: string

  constructor(statusCode: number, message: string) {
    super('SsrException')

    this._statusCode = statusCode
    this._message = message
    this._name = 'SsrException'
  }

  public parse(): { statusCode: number; message: string; name: string } {
    return {
      statusCode: this._statusCode,
      message: this._message,
      name: this._name
    }
  }

  public get statusCode(): number {
    return this._statusCode
  }

  public get message(): string {
    return this._message
  }
}
