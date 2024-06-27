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
import { CreateEventController } from './create_event_controller'
import { CreateEventUsecase } from './create_event_usecase'
import { CreateEventRequest } from './protocols'

config()

export interface CreateEventPresenterProps {
  repo: EventRepositoryInterface
  usecase: CreateEventUsecase
  controller: CreateEventController
  call(
    req: HttpRequest<CreateEventRequest>
  ): Promise<HttpResponse<EventJsonProps> | HttpResponse<Error>>
}

const stage = process.env.STAGE || 'test'

export class CreateEventPresenter implements CreateEventPresenterProps {
  repo: EventRepositoryInterface
  usecase: CreateEventUsecase
  controller: CreateEventController

  constructor() {
    this.repo =
      stage === 'test' ? new EventRepositoryMock() : new EventRepositoryHttp()
    this.usecase = new CreateEventUsecase(this.repo)
    this.controller = new CreateEventController(this.usecase)
  }

  async call(req: HttpRequest<CreateEventRequest>) {
    return await this.controller.call(req)
  }
}