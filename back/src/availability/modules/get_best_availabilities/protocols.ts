import { AvailabilityJsonProps } from '../../../shared/domain/entities/availability'

export type GetBestAvailabilitiesRequest = {
  eventId: string,
}

export type BestAvailabilitiesProps = {
  members: {
    id: string,
    name: string
  }[], 
  startDate: number,
  endDate: number
}[]

export type GetBestAvailabilitiesResponse = {
  status: number
  message: string
  availabilities: BestAvailabilitiesProps
}

