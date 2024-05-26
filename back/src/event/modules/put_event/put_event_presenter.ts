import { config } from 'dotenv'

import { EventJsonProps } from '../../../shared/domain/entities/event'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { EventRepositoryHttp } from '../../shared/infra/repos/event_repository_http'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'
import { EventRepositoryMock } from '../../shared/infra/repos/event_repository_mock'
import { PutEventRequest } from './protocols'
import { PutEventController } from './put_event_controller'
import { PutEventUsecase } from './put_event_usecase'

config()

export interface PutEventPresenterProps {
  repo: EventRepositoryInterface
  usecase: PutEventUsecase
  controller: PutEventController
  call(
    req: HttpRequest<PutEventRequest>
  ): Promise<HttpResponse<EventJsonProps> | HttpResponse<Error>>
}

const stage = process.env.STAGE || 'test'

export class PutEventPresenter implements PutEventPresenterProps {
  repo: EventRepositoryInterface
  usecase: PutEventUsecase
  controller: PutEventController

  constructor() {
    this.repo =
      stage === 'test' ? new EventRepositoryMock() : new EventRepositoryHttp()
    this.usecase = new PutEventUsecase(this.repo)
    this.controller = new PutEventController(this.usecase)
  }

  async call(req: HttpRequest<PutEventRequest>) {
    return await this.controller.call(req)
  }
}
