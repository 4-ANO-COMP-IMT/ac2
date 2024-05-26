import { Event } from '../../../shared/domain/entities/event'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'

export interface GetEventUsecaseProps {
  repo: EventRepositoryInterface
  call(id: string): Promise<Event>
}

export class GetEventUsecase implements GetEventUsecaseProps {
  constructor(public repo: EventRepositoryInterface) {
    this.repo = repo
  }

  async call(id: string) {
    return await this.repo.getEvent(id)
  }
}
