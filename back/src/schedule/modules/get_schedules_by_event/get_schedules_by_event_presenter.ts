import { ScheduleJsonProps } from '../../../shared/domain/entities/schedule'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { environments } from '../../../shared/env/environments'
import { ScheduleRepositoryHttp } from '../../shared/infra/repos/schedule_repository_http'
import { ScheduleRepositoryInterface } from '../../shared/infra/repos/schedule_repository_interface'
import { ScheduleRepositoryMock } from '../../shared/infra/repos/schedule_repository_mock'
import { GetSchedulesByEventController } from './get_schedules_by_event_controller'
import { GetSchedulesByEventUsecase } from './get_schedules_by_event_usecase'
import { GetSchedulesByEventRequest } from './protocols'

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
