import { EventJsonProps } from '../../../shared/domain/entities/event'

export type LoginMemberRequest = {
  eventId: string
  name: string
  password: string
}

export type LoginMemberResponse = {
  status: number
  message: string
  event?: EventJsonProps
}
