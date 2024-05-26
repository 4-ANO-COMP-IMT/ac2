import { Event } from '../../../shared/domain/entities/event'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'

export interface PutEventUsecaseProps {
  repo: EventRepositoryInterface
  call(
    id: string,
    name?: string,
    startDate?: number,
    endDate?: number,
    timeInterval?: number
  ): Promise<Event>
}

export class PutEventUsecase implements PutEventUsecaseProps {
  constructor(public repo: EventRepositoryInterface) {
    this.repo = repo
  }

  async call(
    id: string,
    name?: string,
    startDate?: number,
    endDate?: number,
    timeInterval?: number
  ) {
    return await this.repo.putEvent(id, {
      name,
      startDate,
      endDate,
      timeInterval
    })
  }
}
