class SchemaError extends Error {
  private readonly _code = 422;
  private readonly _data: any;

  constructor(data) {
    super('keys errors');
    this._data = data;
  }

  get code(): number {
    return this._code;
  }

  get data(): any {
    return this._data;
  }
}

export default SchemaError;
