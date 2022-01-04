class SchemaError extends Error {
  private readonly _code: 404 | 400 | 500 | 401 | number;
  private readonly _data: any;

  constructor(code, data) {
    super('keys errors');
    this._code = code;
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
