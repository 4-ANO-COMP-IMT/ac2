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

config()

export interface CommunicationHandlerProps {
  repo: EventRepositoryInterface
  call(
    req: HttpRequest<CommunicationRequest>
  ): Promise<HttpResponse<EventJsonProps> | HttpResponse<Error>>
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
        console.log('req.data.params.id: ', req.data.params.id)
        const event = await this.repo.getEvent(req.data.params.id)
        return HttpResponse.ok<EventJsonProps>('Event found', event.toJson())
      } catch {
        return HttpResponse.notFound('Event not found')
      }
    } else {
      return HttpResponse.badRequest('Invalid type')
    }
  }
}
