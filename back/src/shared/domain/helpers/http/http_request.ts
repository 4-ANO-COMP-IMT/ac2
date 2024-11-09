export class HttpRequest<V = any> {
  private _method: 'get' | 'post' | 'put' | 'delete' | 'create'
  private _data?: V

  constructor(method: 'get' | 'post' | 'put' | 'delete' | 'create', data?: V) {
    this._method = method
    this._data = data
  }

  get data() {
    return this._data
  }

  get method() {
    return this._method
  }
}
