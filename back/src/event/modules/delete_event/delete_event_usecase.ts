import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'
import { Event } from '../../../shared/domain/entities/event'

export interface DeleteEventUsecaseProps {
  repo: EventRepositoryInterface
  call(id: string): Promise<Event>
}

export class DeleteEventUsecase implements DeleteEventUsecaseProps {
  constructor(public repo: EventRepositoryInterface) {
    this.repo = repo
  }

  async call(id: string) {
    return await this.repo.deleteEvent(id)
  }
}
