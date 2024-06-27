import { Event } from '../../../shared/domain/entities/event'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'

export interface CreateEventUsecaseProps {
  repo: EventRepositoryInterface
  call(
    name: string,
    dates: number[],
    startDate: number,
    endDate: number,
    timeInterval: number
  ): Promise<Event>
}

export class CreateEventUsecase implements CreateEventUsecaseProps {
  constructor(public repo: EventRepositoryInterface) {
    this.repo = repo
  }

  async call(
    name: string,
    dates: number[],
    startDate: number,
    endDate: number,
    timeInterval: number
  ) {
    return await this.repo.createEvent({
      name,
      dates,
      startDate,
      endDate,
      timeInterval
    })
  }
}