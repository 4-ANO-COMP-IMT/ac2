import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'
import { Event } from '../../../shared/domain/entities/event'

export interface PutEventUsecaseProps {
  repo: EventRepositoryInterface
  call(
    id: string,
    name?: string,
    start_date?: number,
    end_date?: number,
    time_interval?: number
  ): Promise<Event>
}

export class PutEventUsecase implements PutEventUsecaseProps {
  constructor(public repo: EventRepositoryInterface) {
    this.repo = repo
  }

  async call(
    id: string,
    name?: string,
    start_date?: number,
    end_date?: number,
    time_interval?: number
  ) {
    return await this.repo.putEvent(id, {
      name,
      start_date,
      end_date,
      time_interval
    })
  }
}
