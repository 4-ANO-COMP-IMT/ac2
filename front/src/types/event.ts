import { Member } from './member'

export type Event = {
  id: string
  name: string
  dates: number[]
  notEarlier: number
  notLater: number
  members: Member[]
  description?: string
}

export type EventResponse = {
  message: string
  data?: Event
}
