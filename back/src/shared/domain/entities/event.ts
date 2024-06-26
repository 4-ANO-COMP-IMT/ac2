import { EntityError } from "../helpers/errors/not_found"
import { Member } from "./member"

export interface EventInterface {
  calculateTotalTime(): number
}

export class Event implements EventInterface {
  private _id: string
  private _name: string
  private _startDate: number
  private _endDate: number
  private _notEarlier: number
  private _notLater: number
  private _members: Member[]
  private _description?: string | undefined
  

  constructor (id: string, name: string, startDate: number, endDate: number, notEarlier: number, notLater: number, members: Member[], description?: string | undefined) {
    this._id = id
    this._name = name
    if (endDate < startDate) {
      throw new EntityError('Event', 'startDate must be before endDate')
    }
    this._startDate = startDate
    this._endDate = endDate
    
    if (notEarlier > notLater) {
      throw new EntityError('Event', 'notEarlier must be before notLater')
    }
    this._notEarlier = notEarlier
    this._notLater = notLater
    this._members = members
    this._description = description
  }

  calculateTotalTime() {
    return this._endDate - this._startDate
  }

  equals(event: Event) {
    return (
      this._id === event.id &&
      this._name === event.name &&
      this._startDate === event.startDate &&
      this._endDate === event.endDate &&
      this._notEarlier === event.notEarlier &&
      this._notLater === event.notLater &&
      Event.membersAreEqual(this._members, event.members) &&
      this._description === event.description
    )
  }

  toJson() {
    return {
      id: this._id,
      name: this._name,
      startDate: this._startDate,
      endDate: this._endDate,
      notEarlier: this._notEarlier,
      notLater: this._notLater,
      members: this._members.map(member => member.toJson()),
      description: this._description
    }
  }

  // Getters and Setters
  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get startDate() {
    return this._startDate
  }

  get endDate() {
    return this._endDate
  }

  get notEarlier() {
    return this._notEarlier
  }

  get notLater() {
    return this._notLater
  }

  get members() {
    return this._members
  }

  get description() {
    return this._description
  }

  set id(id: string) {
    this._id = id
  }

  set name(name: string) {
    this._name = name
  }

  set startDate(startDate: number) {
    this._startDate = startDate
  }

  set endDate(endDate: number) {
    this._endDate = endDate
  }

  set notEarlier(notEarlier: number) {
    this._notEarlier = notEarlier
  }

  set notLater(notLater: number) {
    this._notLater = notLater
  }

  set members(members: Member[]) {
    this._members = members
  }
  
  set description(description: string | undefined) {
    this._description = description
  }

  // Static methods
  static membersAreEqual(members1: Member[], members2: Member[]) {
    if (members1.length !== members2.length) {
      return false
    }
    return members1.every((value, index) => value.equal(members2[index]))
  }
}
