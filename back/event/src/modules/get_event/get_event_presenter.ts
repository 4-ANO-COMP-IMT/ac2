import { GetEventUsecase } from './get_event_usecase'
import { GetEventController } from './get_event_controller'
import { EventRepositoryMock } from '../../shared/infra/repos/event_repository_mock'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'
import { GetEventRequest, GetEventResponse } from './protocols'

export interface GetEventPresenterProps {
  repo: EventRepositoryInterface
  usecase: GetEventUsecase
  controller: GetEventController
  call(req: GetEventRequest): Promise<GetEventResponse>
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

  async call(req: GetEventRequest) {
    return await this.controller.call(req)
  }
}
