import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import { PutEventUsecase } from './put_event_usecase'
import { PutEventRequest } from './protocols'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { EventJsonProps } from '../../../shared/domain/entities/event'

interface PutEventControllerProps {
  usecase: PutEventUsecase
  call(
    req: HttpRequest<PutEventRequest>
  ): Promise<HttpResponse<EventJsonProps> | HttpResponse<Error>>
}

export class PutEventController implements PutEventControllerProps {
  constructor(public usecase: PutEventUsecase) {
    this.usecase = usecase
  }

  async call(req: HttpRequest<PutEventRequest>) {
    if (!req.data) {
      return HttpResponse.badRequest('missing body')
    }

    const { id, name, startDate, endDate, timeInterval } = req.data

    if (!id) {
      return HttpResponse.badRequest('id is required')
    }

    try {
      const eventResponse = await this.usecase.call(
        id,
        name,
        startDate,
        endDate,
        timeInterval
      )

      return HttpResponse.ok<EventJsonProps>(
        'event changed',
        eventResponse.toJson()
      )
    } catch (error: any) {
      if (error.message.includes('not found')) {
        return HttpResponse.notFound(error.message)
      }

      return HttpResponse.internalServerError(error.message)
    }
  }
}
