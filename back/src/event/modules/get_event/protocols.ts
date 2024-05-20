import { EventJsonProps } from '../../../shared/domain/entities/event'

export type GetEventRequest = {
  params: {
    id: string
  }
}

export type GetEventResponse = {
  status: number
  message: string
  event?: EventJsonProps
}

export type httpRequest<T = any, V = any> = {
  method: 'get' | 'post' | 'put' | 'delete'
  params?: T
  body?: V
}

export type httpResponse<T = any> = {
  status: number
  message: string
  data?: T
}
