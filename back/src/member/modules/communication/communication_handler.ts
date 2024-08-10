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
import { MemberJsonProps } from '../../../shared/domain/entities/member'
import { Availability } from '../../../shared/domain/entities/availability'

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
    } else if (req.data?.type === 'getMember') {
      try {
        const member = await this.repo.getMember(
          req.data.params.eventId,
          req.data.params.memberId,
        )
        return HttpResponse.ok<MemberJsonProps>(
          'Member created',
          member.toJson()
        )
      } catch (error: any) {
        return HttpResponse.notFound(error.message)
      }
    } else if (req.data?.type === 'updateAvailabilities') {
      try {
        const availabilities = await this.repo.updateAvailabilities(
          req.data.params.eventId,
          req.data.params.member.id,
          req.data.params.member.availabilities.map((availability: Availability) => {
            return new Availability(
              availability.id,
              availability.startDate,
              availability.endDate
            )
          })
        )
        return HttpResponse.ok<undefined>(
          'Availabilities updated',
          undefined
        )
      } catch (error: any) {
        return HttpResponse.notFound(error.message)
      }
    } else {
      return HttpResponse.ok<undefined>('no communication required', undefined)
    }
  }
}
