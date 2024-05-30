export interface ScheduleInterface {
    
}

export type ScheduleJsonProps = {

}

export class Schedule implements ScheduleInterface {
    private _id: string
    private _eventId: string
    private _time: number
    private _name: string

    constructor(
        id: string,
        eventId: string,
        time: number,
        name: string
    ) {
        this._id = id
        this._eventId = eventId
        this._time = time
        this._name = name
    }

    equal(schedule: Schedule) {
        return (
            this._id === schedule._id &&
            this._eventId === schedule._eventId &&
            this._time === schedule._time &&
            this._name === schedule._name
        )
    }

    toJson() {
        return {
            id: this._id,
            event_id: this._eventId,
            time: this._time,
            name: this._name
        }
    }

    // Getters and Setters
    get id() {
        return this._id
    }

    get eventId() {
        return this._eventId
    }

    get time() {
        return this._time
    }

    get name() {
        return this._name
    }

    set id(id: string) {
        this._id = id
    }

    set eventId(eventId: string) {
        this._eventId = eventId
    }

    set time(time: number) {
        this._time = time
    }

    set name(name: string) {
        this._name = name
    }
    
}
