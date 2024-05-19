import {EventRepositoryInterface} from './event_repository_interface'
import { Event } from '../entities/event'


export class EventRepositoryMock implements EventRepositoryInterface {
    events: Event[]
    
    constructor() {
        this.events = [
            new Event(
                '1',
                'Meeting for the project',
                1632950400000,
                1632954000000,
                600000
            ),
            new Event(
                '2',
                'Academy Chest Day',
                1632950200000,
                1632954000000,
                300000
            ),
            new Event(
                '3',
                'Studying Software Engineering',
                1632950000000,
                1632954000000,
                100000
            )
        ]
    }

    getEvent(id: string){
        return this.events.find(event => event.id === id)
    }
    putEvent(event: Event){
        const response = this.events.find(e => e.id === event.id)
        return response
    }

    createEvent(event: Event){
        this.events.push(event)
        return event
    }

    deleteEvent(id: string){
        const event = this.events.find(event => event.id === id)
        if (event) {
            this.events = this.events.filter(event => event.id !== id)
            return event
        }
        return undefined
    }

    // Getters and Setters

    get getEvents() {
        return this.events
    }

}
  