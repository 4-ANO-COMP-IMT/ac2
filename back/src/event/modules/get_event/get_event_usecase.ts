import { Event } from '../../../shared/domain/entities/event'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'

export interface GetEventUsecaseProps {
  repo: EventRepositoryInterface
  call(
    eventId: string
  ): Promise<Event>
}

export class GetEventUsecase implements GetEventUsecaseProps {
  constructor(public repo: EventRepositoryInterface) {
    this.repo = repo
  }

  async call(
    eventId: string
  ) {
    return await this.repo.getEvent(
      eventId
    )
  }
}
