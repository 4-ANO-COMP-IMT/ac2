export interface EventProps {
  id: string
  name: string
  startDate: number
  endDate: number
  timeInterval: number
  calculateTotalTime: () => number
  calculateCellNumbers: () => number
  equals: (event: Event) => boolean
  toJson: () => EventJsonProps
}

export type EventJsonProps = {
  id: string
  name: string
  start_date: number
  end_date: number
  time_interval: number
}

export class Event implements EventProps {
  constructor(
    public id: string,
    public name: string,
    public startDate: number,
    public endDate: number,
    public timeInterval: number
  ) {
    this.id = id
    this.name = name
    this.startDate = startDate
    this.endDate = endDate
    this.timeInterval = timeInterval
  }

  calculateTotalTime() {
    return this.endDate - this.startDate
  }

  calculateCellNumbers() {
    return this.calculateTotalTime() / this.timeInterval
  }

  equals(event: Event) {
    return (
      this.id === event.id &&
      this.name === event.name &&
      this.startDate === event.startDate &&
      this.endDate === event.endDate &&
      this.timeInterval === event.timeInterval
    )
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      start_date: this.startDate,
      end_date: this.endDate,
      time_interval: this.timeInterval
    }
  }

  // Getters and Setters

  get getId() {
    return this.id
  }

  set setId(id: string) {
    this.id = id
  }

  get getName() {
    return this.name
  }

  set setName(name: string) {
    this.name = name
  }

  get getStartDate() {
    return this.startDate
  }

  set setStartDate(startDate: number) {
    this.startDate = startDate
  }

  get getEndDate() {
    return this.endDate
  }

  set setEndDate(endDate: number) {
    this.endDate = endDate
  }

  get getTimeInterval() {
    return this.timeInterval
  }

  set setTimeInterval(timeInterval: number) {
    this.timeInterval = timeInterval
  }
}
