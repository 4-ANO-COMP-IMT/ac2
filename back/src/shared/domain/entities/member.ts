import { Availability, AvailabilityJsonProps } from './availability'

export type MemberJsonProps = {
  id: string
  name: string
  password?: string | undefined
  availabilities: AvailabilityJsonProps[]
}

export interface MemberInterface {}

export class Member implements MemberInterface {
  private _id: string
  private _name: string
  private _password?: string | undefined
  private _availabilities: Availability[]
 
  constructor(
    id: string,
    name: string,
    availabilities: Availability[],
    password?: string | undefined
  ) {
    this._id = id
    this._name = name
    this._password = password
    this._availabilities = availabilities
  }

  equal(member: Member) {
    return (
      this._id === member.id &&
      this._name === member.name &&
      this._password === member.password &&
      Member.availabilitiesAreEqual(this._availabilities, member.availabilities)
    )
  }

  toJson() {
    return {
      id: this._id,
      name: this._name,
      password: this._password,
      availabilities: this._availabilities.map((availability) =>
        availability.toJson()
      )
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

  get availabilities() {
    return this._availabilities
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

  set availabilities(availabilities: Availability[]) {
    this._availabilities = availabilities
  }

  // Static methods
  static availabilitiesAreEqual(
    availabilities1: Availability[],
    availabilities2: Availability[]
  ) {
    if (availabilities1.length !== availabilities2.length) {
      return false
    }
    return availabilities1.every((value, index) =>
      value.equal(availabilities2[index])
    )
  }
}
