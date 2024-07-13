import { EventJsonProps } from '../../../shared/domain/entities/event'

export type CreateMemberRequest = {
  eventId: string
  name: string
  password?: string
}

export type CreateMemberResponse = {
  status: number
  message: string
  event?: EventJsonProps
}
