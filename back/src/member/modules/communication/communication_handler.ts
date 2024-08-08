import { config } from 'dotenv'

import { EventJsonProps } from '../../../shared/domain/entities/event'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { MemberRepositoryInterface } from '../../shared/infra/repos/member_repository_interface'
import { MemberRepositoryMock } from '../../shared/infra/repos/member_repository_mock'
import { MemberRepositoryHttp } from '../../shared/infra/repos/member_repository_http'
import { CommunicationRequest } from '../../../member/modules/communication/protocols'

config()

export interface CommunicationHandlerProps {
  repo: MemberRepositoryInterface
  call(
    req: HttpRequest<CommunicationRequest>
  ): Promise<HttpResponse<any | Error>>
}

const stage = process.env.STAGE || 'test'

export class CommunicationHandler implements CommunicationHandlerProps {
  repo: MemberRepositoryInterface

  constructor() {
    this.repo =
      stage === 'test' ? new MemberRepositoryMock() : new MemberRepositoryHttp()
  }

  async call(req: HttpRequest<CommunicationRequest>) {
    return HttpResponse.ok<undefined>('no communication required', undefined)
  }
}
