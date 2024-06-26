import { EntityError } from "../helpers/errors/not_found"

export interface AvailabilityInterface {}

export type AvailabilityJsonProps = {
  id: string
  startDate: number // mili
  endDate: number // mili
}

export class Availability implements AvailabilityInterface {
  private _id: string
  private _startDate: number
  private _endDate: number

  constructor(id: string, startDate: number, endDate: number) {
    this._id = id
    this._startDate = startDate
    if (startDate > endDate) {
      throw new EntityError('Availability', 'startDate must be before endDate')
    }
    this._endDate = endDate
  }

  equal(availability: Availability) {
    return (
        this._id === availability._id &&
        this._startDate === availability._startDate &&
        this._endDate === availability._endDate
    )
  }

  toJson() {
    return {
        id: this._id,
        startDate: this._startDate,
        endDate: this._endDate
    }
  }

  // Getters and Setters
  get id() {
    return this._id
  }

  get startDate() {
    return this._startDate
  }

  get endDate() {
    return this._endDate
  }

  set id(id: string) {
    this._id = id
  }

  set startDate(startDate: number) {
    this._startDate = startDate
  }

  set endDate(endDate: number) {
    this._endDate = endDate
  }

}
