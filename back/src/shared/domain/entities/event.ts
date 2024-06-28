import { EntityError } from "../helpers/errors/not_found"
import { Member, MemberJsonProps } from "./member"

export type EventJsonProps = {
  id: string
  name: string
  dates: number[]
  notEarlier: number
  notLater: number
  members: MemberJsonProps[]
  description?: string | undefined
}

export interface EventInterface {}

export class Event implements EventInterface {
  private _id: string
  private _name: string
  private _dates: number[]
  private _notEarlier: number
  private _notLater: number
  private _members: Member[]
  private _description?: string | undefined
  

  constructor (id: string, name: string, dates: number[], notEarlier: number, notLater: number, members: Member[], description?: string | undefined) {
    this._id = id
    this._name = name
    this._dates = dates
    
    if (notEarlier > notLater) {
      throw new EntityError('Event', 'notEarlier must be before notLater')
    }
    if (0 > notEarlier || notEarlier > 86400000) {
      throw new EntityError('Event', 'notEarlier must be between 0 and 86400000')
    }
    this._notEarlier = notEarlier
    if (0 > notLater || notLater > 86400000) {
      throw new EntityError('Event', 'notLater must be between 0 and 86400000')
    }
    this._notLater = notLater
    this._members = members
    this._description = description
  }

  equals(event: Event) {
    return (
      this._id === event.id &&
      this._name === event.name &&
      Event.datesAreEqual(this._dates, event.dates) &&
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
      dates: this._dates,
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

  get dates() {
    return this._dates
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

  set dates(dates: number[]) {
    this._dates = dates
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

  static datesAreEqual(dates1: number[], dates2: number[]) {
    if (dates1.length !== dates2.length) {
      return false
    }
    return dates1.every((value, index) => value === dates2[index])
  }
}
