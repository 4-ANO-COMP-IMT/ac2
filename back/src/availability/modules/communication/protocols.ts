import { AvailabilityJsonProps } from '../../../shared/domain/entities/availability'

export type CommunicationRequest = {
  mss: string
  type: string
  params: any
}

export type CommunicationResponse = {
  status: number
  message: string
  availability?: AvailabilityJsonProps
}
