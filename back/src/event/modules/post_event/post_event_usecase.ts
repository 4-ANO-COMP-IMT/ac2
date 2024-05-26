import { Event } from '../../../shared/domain/entities/event'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'

export interface PostEventUsecaseProps {
  repo: EventRepositoryInterface
  call(
    name: string,
    startDate: number,
    endDate: number,
    timeInterval: number
  ): Promise<Event>
}

export class PostEventUsecase implements PostEventUsecaseProps {
  constructor(public repo: EventRepositoryInterface) {
    this.repo = repo
  }

  async call(
    name: string,
    startDate: number,
    endDate: number,
    timeInterval: number
  ) {
    return await this.repo.createEvent({
      name,
      startDate,
      endDate,
      timeInterval
    })
  }
}
