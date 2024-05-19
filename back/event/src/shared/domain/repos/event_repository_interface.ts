import { Event } from '../entities/event'

export interface EventRepositoryInterface {
    events: Event[]
    getEvent: (id: string) => Event | undefined
    putEvent: (event: Event) => Event | undefined
    createEvent: (event: Event) => Event
    deleteEvent: (id: string) => Event | undefined
}