import { AvailabilityJsonProps } from './availability'

export type MemberJsonProps = {
  id: string
  name: string
  password?: string
  availabilities: AvailabilityJsonProps[]
}
