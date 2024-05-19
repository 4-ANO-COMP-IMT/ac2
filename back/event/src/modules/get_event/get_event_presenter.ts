import { GetEventUsecase } from "./get_event_usecase"
import { GetEventController } from "./get_event_controller"
import { EventRepositoryMock } from "../../shared/domain/repos/event_repository_mock"
import { EventRepositoryInterface } from "../../shared/domain/repos/event_repository_interface"

export interface GetEventPresenterProps {
    repo: EventRepositoryInterface
    usecase: GetEventUsecase
    controller: GetEventController
    call: (req: any) => any
  }
  
export class GetEventPresenter implements GetEventPresenterProps {
    repo: EventRepositoryInterface
    usecase: GetEventUsecase
    controller: GetEventController

    constructor() {
      this.repo = new EventRepositoryMock()
      this.usecase = new GetEventUsecase(this.repo)
      this.controller = new GetEventController(this.usecase)
    }
  
    call(req: any) {
        return this.controller.call(req)
    }
}

  