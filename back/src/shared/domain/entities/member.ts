import { Availability } from './availability'

export interface MemberInterface {}

export type MemberJsonProps = {
  id: string
  name: string
  password?: string | undefined
  schedules: Availability[]
}

export class Member implements MemberInterface {
  private _id: string
  private _name: string
  private _password?: string | undefined
  private _schedules: Availability[]

  constructor(
    id: string,
    name: string,
    schedules: Availability[],
    password?: string | undefined
  ) {
    this._id = id
    this._name = name
    this._password = password
    this._schedules = schedules
  }

  equal(schedule: Member) {
    return (
      this._id === schedule.id &&
      this._name === schedule.name &&
      this._password === schedule.password &&
      this._schedules === schedule.schedules
    )
  }

  toJson() {
    return {
      id: this._id,
      name: this._name,
      password: this._password,
      schedules: this._schedules
    }
  }

  // Getters and Setters
  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get password() {
    return this._password
  }

  get schedules() {
    return this._schedules
  }

  set id(id: string) {
    this._id = id
  }

  set name(name: string) {
    this._name = name
  }

  set password(password: string | undefined) {
    this._password = password
  }

  set schedules(schedules: Availability[]) {
    this._schedules = schedules
  }
}
