import { EventJsonProps } from '../../../shared/domain/entities/event'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { environments } from '../../../shared/env/environments'
import { EventRepositoryHttp } from '../../shared/infra/repos/event_repository_http'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'
import { EventRepositoryMock } from '../../shared/infra/repos/event_repository_mock'
import { GetEventController } from './get_event_controller'
import { GetEventUsecase } from './get_event_usecase'
import { GetEventRequest } from './protocols'

export interface GetEventPresenterProps {
  repo: EventRepositoryInterface
  usecase: GetEventUsecase
  controller: GetEventController
  call(
    req: HttpRequest<GetEventRequest>
  ): Promise<HttpResponse<EventJsonProps> | HttpResponse<Error>>
}

const stage = environments.stage

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
