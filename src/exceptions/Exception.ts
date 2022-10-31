export class Exception extends Error {
  constructor(message: string) {
    super(message)
  }

  public getMessage(): string {
    return this.message
  }
}
