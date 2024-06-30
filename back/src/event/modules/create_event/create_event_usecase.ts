import { Event } from '../../../shared/domain/entities/event'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'

export interface CreateEventUsecaseProps {
  repo: EventRepositoryInterface
  call(
    name: string,
    dates: number[],
    notEarlier: number,
    notLater: number,
    description?: string | undefined
  ): Promise<Event>
}

export class CreateEventUsecase implements CreateEventUsecaseProps {
  constructor(public repo: EventRepositoryInterface) {
    this.repo = repo
  }

  async call(
    name: string,
    dates: number[],
    notEarlier: number,
    notLater: number,
    description?: string | undefined
  ) {
    return await this.repo.createEvent(
      name,
      dates,
      notEarlier,
      notLater,
      description
    )
  }
}
