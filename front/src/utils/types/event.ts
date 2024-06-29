import { MemberJsonProps } from './member'

export type Event = {
  eventName: string
  description?: string
  dates: number[]
  notEarlier: number
  notLater: number
  timezone?: number
}

export type EventJsonProps = {
  id: string
  name: string
  dates: number[]
  notEarlier: number
  notLater: number
  members: MemberJsonProps[]
  description?: string | undefined
}

export type CreateEventResponse = {
  status: number
  message: string
  event?: EventJsonProps
}
