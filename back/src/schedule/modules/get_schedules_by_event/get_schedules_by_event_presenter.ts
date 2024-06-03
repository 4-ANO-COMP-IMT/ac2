import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'

import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import { ScheduleJsonProps } from '../../../shared/domain/entities/schedule'
import { GetSchedulesByEventRequest } from './protocols'
import { GetSchedulesByEventUsecase } from './get_schedules_by_event_usecase'
import { GetSchedulesByEventController } from './get_schedules_by_event_controller'
import { ScheduleRepositoryInterface } from '../../shared/infra/repos/schedule_repository_interface'
import { environments } from '../../../shared/env/environments'
import { ScheduleRepositoryMock } from '../../shared/infra/repos/schedule_repository_mock'
import { ScheduleRepositoryHttp } from '../../shared/infra/repos/schedule_repository_http'

export interface GetEventPresenterProps {
  repo: ScheduleRepositoryInterface
  usecase: GetSchedulesByEventUsecase
  controller: GetSchedulesByEventController
  call(
    req: HttpRequest<GetSchedulesByEventRequest>
  ): Promise<HttpResponse<ScheduleJsonProps[]> | HttpResponse<Error>>
}

const stage = environments.stage

export class GetSchedulesByEventPresenter implements GetEventPresenterProps {
  repo: ScheduleRepositoryInterface
  usecase: GetSchedulesByEventUsecase
  controller: GetSchedulesByEventController

  constructor() {
    this.repo =
      stage === 'test'
        ? new ScheduleRepositoryMock()
        : new ScheduleRepositoryHttp()
    this.usecase = new GetSchedulesByEventUsecase(this.repo)
    this.controller = new GetSchedulesByEventController(this.usecase)
  }

  async call(req: HttpRequest<GetSchedulesByEventRequest>) {
    return await this.controller.call(req)
  }
}
