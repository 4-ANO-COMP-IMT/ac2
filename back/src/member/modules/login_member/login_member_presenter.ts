import { config } from 'dotenv'

import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { MemberRepositoryInterface } from '../../shared/infra/repos/member_repository_interface'
import { MemberRepositoryMock } from '../../shared/infra/repos/member_repository_mock'
import { MemberRepositoryMongo } from '../../shared/infra/repos/member_repository_mongo'
import { LoginMemberController } from './login_member_controller'
import { LoginMemberUsecase } from './login_member_usecase'
import { LoginMemberRequest } from './protocols'

config()

export interface LoginMemberPresenterProps {
  repo: MemberRepositoryInterface
  usecase: LoginMemberUsecase
  controller: LoginMemberController
  call(
    req: HttpRequest<LoginMemberRequest>
  ): Promise<HttpResponse<boolean> | HttpResponse<Error>>
}

const stage = process.env.STAGE || 'test'

export class LoginMemberPresenter implements LoginMemberPresenterProps {
  repo: MemberRepositoryInterface
  usecase: LoginMemberUsecase
  controller: LoginMemberController

  constructor() {
    this.repo =
      stage === 'test'
        ? new MemberRepositoryMock()
        : new MemberRepositoryMongo()
    this.usecase = new LoginMemberUsecase(this.repo)
    this.controller = new LoginMemberController(this.usecase)
  }

  async call(req: HttpRequest<LoginMemberRequest>) {
    return await this.controller.call(req)
  }
}
