export interface EventInterface {
  calculateTotalTime(): number
  calculateCellNumbers(): number
  equals(event: Event): boolean
  toJson(): EventJsonProps
}

export type EventJsonProps = {
  id: string
  name: string
  start_date: number
  end_date: number
  time_interval: number
}

export class Event implements EventInterface {
  private _id: string
  private _name: string
  private _startDate: number
  private _endDate: number
  private _timeInterval: number

  constructor(
    id: string,
    name: string,
    startDate: number,
    endDate: number,
    timeInterval: number
  ) {
    this._id = id
    this._name = name
    this._startDate = startDate
    this._endDate = endDate
    this._timeInterval = timeInterval
  }

  calculateTotalTime() {
    return this._endDate - this._startDate
  }

  calculateCellNumbers() {
    return this.calculateTotalTime() / this._timeInterval
  }

  equals(event: Event) {
    return (
      this._id === event._id &&
      this._name === event._name &&
      this._startDate === event._startDate &&
      this._endDate === event._endDate &&
      this._timeInterval === event._timeInterval
    )
  }

  toJson() {
    return {
      id: this._id,
      name: this._name,
      start_date: this._startDate,
      end_date: this._endDate,
      time_interval: this._timeInterval
    }
  }

  // Getters and Setters

  get id() {
    return this._id
  }

  set id(id: string) {
    this._id = id
  }

  get name() {
    return this._name
  }

  set name(name: string) {
    this._name = name
  }

  get startDate() {
    return this._startDate
  }

  set startDate(startDate: number) {
    this._startDate = startDate
  }

  get endDate() {
    return this._endDate
  }

  set endDate(endDate: number) {
    this._endDate = endDate
  }

  get timeInterval() {
    return this._timeInterval
  }

  set timeInterval(timeInterval: number) {
    this._timeInterval = timeInterval
  }
}
