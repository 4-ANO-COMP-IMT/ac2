import { config } from 'dotenv'

import { ScheduleJsonProps } from '../../../shared/domain/entities/schedule'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { ScheduleRepositoryHttp } from '../../shared/infra/repos/schedule_repository_http'
import { ScheduleRepositoryInterface } from '../../shared/infra/repos/schedule_repository_interface'
import { ScheduleRepositoryMock } from '../../shared/infra/repos/schedule_repository_mock'
import { PostScheduleController } from './post_schedule_controller'
import { PostScheduleUsecase } from './post_schedule_usecase'
import { PostScheduleRequest } from './protocols'

config()

export interface PostSchedulePresenterProps {
  repo: ScheduleRepositoryInterface
  usecase: PostScheduleUsecase
  controller: PostScheduleController
  call(
    req: HttpRequest<PostScheduleRequest>
  ): Promise<HttpResponse<ScheduleJsonProps> | HttpResponse<Error>>
}

const stage = process.env.STAGE || 'test'

export class PostSchedulePresenter implements PostSchedulePresenterProps {
  repo: ScheduleRepositoryInterface
  usecase: PostScheduleUsecase
  controller: PostScheduleController

  constructor() {
    this.repo =
      stage === 'test'
        ? new ScheduleRepositoryMock()
        : new ScheduleRepositoryHttp()
    this.usecase = new PostScheduleUsecase(this.repo)
    this.controller = new PostScheduleController(this.usecase)
  }

  async call(req: HttpRequest<PostScheduleRequest>) {
    return await this.controller.call(req)
  }
}
