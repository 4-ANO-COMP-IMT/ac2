import { HTTP_STATUS_CODE } from './http_status_code'

export type Error = {
  status: HTTP_STATUS_CODE
  message: string
  data: undefined
}

export class HttpResponse<T = any> {
  status: HTTP_STATUS_CODE
  message: string
  data?: T

  constructor(status: HTTP_STATUS_CODE, message: string, data?: T) {
    this.status = status
    this.message = message
    this.data = data
  }

  static ok<T>(message: string, data: T) {
    return new HttpResponse(HTTP_STATUS_CODE.OK, message, data)
  }

  static created<T>(message: string, data: T) {
    return new HttpResponse(HTTP_STATUS_CODE.CREATED, message, data)
  }

  static badRequest(message: string): HttpResponse<Error> {
    return new HttpResponse(HTTP_STATUS_CODE.BAD_REQUEST, message)
  }

  static notFound(message: string): HttpResponse<Error> {
    return new HttpResponse(HTTP_STATUS_CODE.NOT_FOUND, message)
  }

  static conflict(message: string): HttpResponse<Error> {
    return new HttpResponse(HTTP_STATUS_CODE.CONFLICT, message)
  }
  
  static internalServerError(message: string): HttpResponse<Error> {
    return new HttpResponse(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, message)
  }


}
