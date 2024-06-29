import { MemberJsonProps } from './member'

export type Event = {
  name: string
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
  message: string
  data?: EventJsonProps
}
