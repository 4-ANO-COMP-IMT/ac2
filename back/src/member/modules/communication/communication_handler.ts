import { config } from 'dotenv'

import { CommunicationRequest } from '../../../member/modules/communication/protocols'
import { EventJsonProps } from '../../../shared/domain/entities/event'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { MemberRepositoryHttp } from '../../shared/infra/repos/member_repository_http'
import { MemberRepositoryInterface } from '../../shared/infra/repos/member_repository_interface'
import { MemberRepositoryMock } from '../../shared/infra/repos/member_repository_mock'

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
    if (req.data?.type === 'createEvent') {
      const event = await this.repo.createEvent(
        req.data.params.id,
        req.data.params.name,
        req.data.params.dates,
        req.data.params.notEarlier,
        req.data.params.notLater,
        req.data.params.description
      )
      return HttpResponse.ok<EventJsonProps>('Event created', event.toJson())
    }
    return HttpResponse.ok<undefined>('no communication required', undefined)
  }
}
