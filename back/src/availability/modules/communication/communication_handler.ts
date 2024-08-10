import { config } from 'dotenv'

import { AvailabilityJsonProps } from '../../../shared/domain/entities/availability'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { AvailabilityRepositoryHttp } from '../../shared/infra/repos/availability_repository_http'
import { AvailabilityRepositoryInterface } from '../../shared/infra/repos/availability_repository_interface'
import { AvailabilityRepositoryMock } from '../../shared/infra/repos/availability_repository_mock'
import { CommunicationRequest } from './protocols'
import { MemberJsonProps } from '../../../shared/domain/entities/member'
import { EventJsonProps } from '../../../shared/domain/entities/event'

config()

export interface CommunicationHandlerProps {
  repo: AvailabilityRepositoryInterface
  call(
    req: HttpRequest<CommunicationRequest>
  ): Promise<HttpResponse<any> | HttpResponse<Error>>
}

const stage = process.env.STAGE || 'test'

export class CommunicationHandler implements CommunicationHandlerProps {
  repo: AvailabilityRepositoryInterface

  constructor() {
    this.repo =
      stage === 'test' ? new AvailabilityRepositoryMock() : new AvailabilityRepositoryHttp()
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
    } else if (req.data?.type === 'createMember') {
      try {
        console.log("Here! Trying to createMember")
        const member = await this.repo.createMember(
          req.data.params.eventId,
          req.data.params.memberId,
          req.data.params.name,
          req.data.params.password
        )
        console.log("CreateMember OK")
        return HttpResponse.ok<MemberJsonProps>(
          'Member created',
          member.toJson()
        )
      } catch (error){
        console.log("CreateMember failed:")
        console.log(error)
        return HttpResponse.badRequest('Member already exists')
      }
    } else {
      return HttpResponse.badRequest('Invalid type')
    }
  }
}
