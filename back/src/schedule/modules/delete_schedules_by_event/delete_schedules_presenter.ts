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
import { DeleteScheduleController } from './delete_schedules_controller'
import { DeleteScheduleUsecase } from './delete_schedules_usecase'
import { DeleteScheduleRequest } from './protocols'

export interface DeleteSchedulePresenterProps {
  repo: ScheduleRepositoryInterface
  usecase: DeleteScheduleUsecase
  controller: DeleteScheduleController
  call(
    req: HttpRequest<DeleteScheduleRequest>
  ): Promise<HttpResponse<ScheduleJsonProps> | HttpResponse<Error>>
}

const stage = environments.stage

export class DeleteSchedulePresenter implements DeleteSchedulePresenterProps {
  repo: ScheduleRepositoryInterface
  usecase: DeleteScheduleUsecase
  controller: DeleteScheduleController

  constructor() {
    this.repo =
      stage === 'test'
        ? new ScheduleRepositoryMock()
        : new ScheduleRepositoryHttp()
    this.usecase = new DeleteScheduleUsecase(this.repo)
    this.controller = new DeleteScheduleController(this.usecase)
  }

  async call(req: HttpRequest<DeleteScheduleRequest>) {
    return await this.controller.call(req)
  }
}
