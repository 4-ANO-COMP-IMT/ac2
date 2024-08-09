import { Availability } from '../../../../shared/domain/entities/availability'
import { AvailabilityRepositoryInterface } from './availability_repository_interface'

export class AvailabilityRepositoryHttp implements AvailabilityRepositoryInterface {
  async updateAvailabilities(): Promise<Availability[]> {
    throw new Error('Method not implemented.')
  }
}
