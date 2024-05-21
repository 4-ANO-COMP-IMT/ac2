import { GetEventUsecase } from './get_event_usecase'
import { GetEventController } from './get_event_controller'
import { EventRepositoryMock } from '../../shared/infra/repos/event_repository_mock'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'
import { GetEventRequest, GetEventResponse } from './protocols'
import { EventRepositoryHttp } from '../../shared/infra/repos/event_repository_http'
import { config } from 'dotenv'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import { HttpResponse } from '../../../shared/domain/helpers/http/http_response'

config()

export interface GetEventPresenterProps {
  repo: EventRepositoryInterface
  usecase: GetEventUsecase
  controller: GetEventController
  call(
    req: HttpRequest<GetEventRequest>
  ): Promise<HttpResponse<GetEventResponse>>
}

const stage = process.env.STAGE || 'test'

export class GetEventPresenter implements GetEventPresenterProps {
  repo: EventRepositoryInterface
  usecase: GetEventUsecase
  controller: GetEventController

  constructor() {
    this.repo =
      stage === 'test' ? new EventRepositoryMock() : new EventRepositoryHttp()
    this.usecase = new GetEventUsecase(this.repo)
    this.controller = new GetEventController(this.usecase)
  }

  async call(req: HttpRequest<GetEventRequest>) {
    return await this.controller.call(req)
  }
}
