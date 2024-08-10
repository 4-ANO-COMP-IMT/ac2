import { config } from 'dotenv'

import { EventJsonProps } from '../../../shared/domain/entities/event'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { EventRepositoryHttp } from '../../shared/infra/repos/event_repository_http'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'
import { EventRepositoryMock } from '../../shared/infra/repos/event_repository_mock'
import { CommunicationRequest } from './protocols'
import { Availability } from '../../../shared/domain/entities/availability'
import { MemberJsonProps } from '../../../shared/domain/entities/member'

config()

export interface CommunicationHandlerProps {
  repo: EventRepositoryInterface
  call(
    req: HttpRequest<CommunicationRequest>
  ): Promise<HttpResponse<any> | HttpResponse<Error>>
}

const stage = process.env.STAGE || 'test'

export class CommunicationHandler implements CommunicationHandlerProps {
  repo: EventRepositoryInterface

  constructor() {
    this.repo =
      stage === 'test' ? new EventRepositoryMock() : new EventRepositoryHttp()
  }

  async call(req: HttpRequest<CommunicationRequest>) {
    if (req.data?.type === 'getEvent') {
      try {
        const event = await this.repo.getEvent(req.data.params.id)
        return HttpResponse.ok<EventJsonProps>('Event found', event.toJson())
      } catch {
        return HttpResponse.notFound('Event not found')
      }
    } else if (req.data?.type === 'createMember') {
      try {
        const member = await this.repo.createMember(
          req.data.params.eventId,
          req.data.params.memberId,
          req.data.params.name,
          req.data.params.password
        )
        return HttpResponse.ok<MemberJsonProps>(
          'Member created',
          member.toJson()
        )
      } catch {
        return HttpResponse.badRequest('Member already exists')
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
