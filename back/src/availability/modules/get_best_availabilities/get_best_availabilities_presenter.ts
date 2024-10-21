import { config } from 'dotenv'

import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { AvailabilityRepositoryInterface } from '../../shared/infra/repos/availability_repository_interface'
import { AvailabilityRepositoryMock } from '../../shared/infra/repos/availability_repository_mock'
import { GetBestAvailabilitiesController } from './get_best_availabilities_controller'
import { GetBestAvailabilitiesUsecase } from './get_best_availabilities_usecase'
import { BestAvailabilitiesProps, GetBestAvailabilitiesRequest } from './protocols'
import { AvailabilityJsonProps } from '../../../shared/domain/entities/availability'
import { AvailabilityRepositoryMongo } from '../../shared/infra/repos/availability_repository_mongo'

config()

export interface GetBestAvailabilitiesPresenterProps {
  repo: AvailabilityRepositoryInterface
  usecase: GetBestAvailabilitiesUsecase
  controller: GetBestAvailabilitiesController
  call(
    req: HttpRequest<GetBestAvailabilitiesRequest>
  ): Promise<HttpResponse<BestAvailabilitiesProps | Error>>
}

const stage = process.env.STAGE || 'test'

export class GetBestAvailabilitiesPresenter implements GetBestAvailabilitiesPresenterProps {
  repo: AvailabilityRepositoryInterface
  usecase: GetBestAvailabilitiesUsecase
  controller: GetBestAvailabilitiesController

  constructor() {
    this.repo =
      stage === 'test' ? new AvailabilityRepositoryMock() : new AvailabilityRepositoryMongo()
    this.usecase = new GetBestAvailabilitiesUsecase(this.repo)
    this.controller = new GetBestAvailabilitiesController(this.usecase)
  }

  async call(req: HttpRequest<GetBestAvailabilitiesRequest>): Promise<HttpResponse<BestAvailabilitiesProps | Error>> {
    return await this.controller.call(req)
  }
}
