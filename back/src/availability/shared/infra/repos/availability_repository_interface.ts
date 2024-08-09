import { Availability } from '../../../../shared/domain/entities/availability'

export interface AvailabilityRepositoryInterface {
  updateAvailabilities(
    eventId: string,
    memberId: string,
    availabilities: Availability[]
  ): Promise<Availability[]>

}
