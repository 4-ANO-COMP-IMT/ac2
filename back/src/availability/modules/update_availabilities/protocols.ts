import { AvailabilityJsonProps } from '../../../shared/domain/entities/availability'

export type UpdateAvailabilitiesRequest = {
  eventId: string,
  memberId: string,
  availabilities: {
    startDate: number,
    endDate: number
  }[]
}

export type UpdateAvailabilitiesResponse = {
  status: number
  message: string
  availabilities?: AvailabilityJsonProps[]
}
