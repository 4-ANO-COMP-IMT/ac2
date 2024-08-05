import { EventJsonProps } from '../../../shared/domain/entities/event'

export type CommunicationRequest = {
  mss: string
  type: string
  params: any
}

export type CommunicationResponse = {
  status: number
  message: string
  event?: EventJsonProps
}
