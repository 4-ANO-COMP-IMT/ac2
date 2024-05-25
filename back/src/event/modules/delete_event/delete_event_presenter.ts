import { EventRepositoryMock } from '../../shared/infra/repos/event_repository_mock'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'
import { EventRepositoryHttp } from '../../shared/infra/repos/event_repository_http'
import { config } from 'dotenv'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { EventJsonProps } from '../../../shared/domain/entities/event'
import { DeleteEventUsecase } from './delete_event_usecase'
import { DeleteEventRequest } from './protocols'
import { DeleteEventController } from './delete_event_controller'

config()

export interface DeleteEventPresenterProps {
  repo: EventRepositoryInterface
  usecase: DeleteEventUsecase
  controller: DeleteEventController
  call(
    req: HttpRequest<DeleteEventRequest>
  ): Promise<HttpResponse<EventJsonProps> | HttpResponse<Error>>
}

const stage = process.env.STAGE || 'test'

export class DeleteEventPresenter implements DeleteEventPresenterProps {
  repo: EventRepositoryInterface
  usecase: DeleteEventUsecase
  controller: DeleteEventController

  constructor() {
    this.repo =
      stage === 'test' ? new EventRepositoryMock() : new EventRepositoryHttp()
    this.usecase = new DeleteEventUsecase(this.repo)
    this.controller = new DeleteEventController(this.usecase)
  }

  async call(req: HttpRequest<DeleteEventRequest>) {
    return await this.controller.call(req)
  }
}
