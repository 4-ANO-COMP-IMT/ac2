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
import { PostEventController } from './post_event_controller'
import { PostEventUsecase } from './post_event_usecase'
import { PostEventRequest } from './protocols'

config()

export interface PostEventPresenterProps {
  repo: EventRepositoryInterface
  usecase: PostEventUsecase
  controller: PostEventController
  call(
    req: HttpRequest<PostEventRequest>
  ): Promise<HttpResponse<EventJsonProps> | HttpResponse<Error>>
}

const stage = process.env.STAGE || 'test'

export class PostEventPresenter implements PostEventPresenterProps {
  repo: EventRepositoryInterface
  usecase: PostEventUsecase
  controller: PostEventController

  constructor() {
    this.repo =
      stage === 'test' ? new EventRepositoryMock() : new EventRepositoryHttp()
    this.usecase = new PostEventUsecase(this.repo)
    this.controller = new PostEventController(this.usecase)
  }

  async call(req: HttpRequest<PostEventRequest>) {
    return await this.controller.call(req)
  }
}
