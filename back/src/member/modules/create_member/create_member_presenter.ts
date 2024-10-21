import { config } from 'dotenv'

import { MemberJsonProps } from '../../../shared/domain/entities/member'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { MemberRepositoryInterface } from '../../shared/infra/repos/member_repository_interface'
import { MemberRepositoryMock } from '../../shared/infra/repos/member_repository_mock'
import { MemberRepositoryMongo } from '../../shared/infra/repos/member_repository_mongo'
import { CreateMemberController } from './create_member_controller'
import { CreateMemberUsecase } from './create_member_usecase'
import { CreateMemberRequest } from './protocols'

config()

export interface CreateMemberPresenterProps {
  repo: MemberRepositoryInterface
  usecase: CreateMemberUsecase
  controller: CreateMemberController
  call(
    req: HttpRequest<CreateMemberRequest>
  ): Promise<HttpResponse<MemberJsonProps> | HttpResponse<Error>>
}

const stage = process.env.STAGE || 'test'

export class CreateMemberPresenter implements CreateMemberPresenterProps {
  repo: MemberRepositoryInterface
  usecase: CreateMemberUsecase
  controller: CreateMemberController

  constructor() {
    this.repo =
      stage === 'test'
        ? new MemberRepositoryMock()
        : new MemberRepositoryMongo()
    this.usecase = new CreateMemberUsecase(this.repo)
    this.controller = new CreateMemberController(this.usecase)
  }

  async call(req: HttpRequest<CreateMemberRequest>) {
    return await this.controller.call(req)
  }
}
