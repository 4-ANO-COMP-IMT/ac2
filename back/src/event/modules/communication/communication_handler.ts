import { config } from 'dotenv'

import { EventJsonProps } from '../../../shared/domain/entities/event'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'
import { EventRepositoryMock } from '../../shared/infra/repos/event_repository_mock'
import { EventRepositoryMongo } from '../../shared/infra/repos/event_repository_mongo'
import { CommunicationRequest } from './protocols'

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
      stage === 'test' ? new EventRepositoryMock() : new EventRepositoryMongo()
  }

  async call(req: HttpRequest<CommunicationRequest>) {
    if (req.data?.type === 'getEvent') {
      try {
        console.log('req.data.params.id: ', req.data.params.id)
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
        return HttpResponse.ok<EventJsonProps>(
          'Member created',
          member.toJson()
        )
      } catch {
        return HttpResponse.badRequest('Member already exists')
      }
    } else {
      return HttpResponse.badRequest('Invalid type')
    }
  }
}
