import { config } from 'dotenv'

import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { AvailabilityRepositoryInterface } from '../../shared/infra/repos/availability_repository_interface'
import { AvailabilityRepositoryMock } from '../../shared/infra/repos/availability_repository_mock'
import { UpdateAvailabilitiesController } from './update_availabilities_controller'
import { UpdateAvailabilitiesUsecase } from './update_availabilities_usecase'
import { UpdateAvailabilitiesRequest } from './protocols'
import { AvailabilityJsonProps } from '../../../shared/domain/entities/availability'
import { AvailabilityRepositoryMongo } from '../../shared/infra/repos/availability_repository_mongo'

config()

export interface UpdateAvailabilitiesPresenterProps {
  repo: AvailabilityRepositoryInterface
  usecase: UpdateAvailabilitiesUsecase
  controller: UpdateAvailabilitiesController
  call(
    req: HttpRequest<UpdateAvailabilitiesRequest>
  ): Promise<HttpResponse<AvailabilityJsonProps[]> | HttpResponse<Error>>
}

const stage = process.env.STAGE || 'test'

export class UpdateAvailabilitiesPresenter implements UpdateAvailabilitiesPresenterProps {
  repo: AvailabilityRepositoryInterface
  usecase: UpdateAvailabilitiesUsecase
  controller: UpdateAvailabilitiesController

  constructor() {
    this.repo =
      stage === 'test' ? new AvailabilityRepositoryMock() : new AvailabilityRepositoryMongo()
    this.usecase = new UpdateAvailabilitiesUsecase(this.repo)
    this.controller = new UpdateAvailabilitiesController(this.usecase)
  }

  async call(req: HttpRequest<UpdateAvailabilitiesRequest>) {
    return await this.controller.call(req)
  }
}
