import { EventRepositoryInterface } from "../../shared/domain/repos/event_repository_interface"
import { Event } from "../../shared/domain/entities/event"

export interface GetEventUsecaseProps {
    repo: EventRepositoryInterface
    call: (id: string) => Event | undefined
  }
  
export class GetEventUsecase implements GetEventUsecaseProps {
    constructor(public repo: EventRepositoryInterface) {
      this.repo = repo
    }
  
    call(id: string) {
        return this.repo.getEvent(id)
    }
}

  