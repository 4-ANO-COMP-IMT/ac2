import { Availability } from './availability'

export type Member = {
  id: string
  name: string
  password?: string
  availabilities: Availability[]
}
