import { EventJsonProps } from '../../../shared/domain/entities/event'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { PutEventRequest } from './protocols'
import { PutEventUsecase } from './put_event_usecase'

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
    if (!req.data?.id) {
      return HttpResponse.badRequest('id is required')
    }

    if (
      !req.data?.name &&
      !req.data?.startDate &&
      !req.data?.endDate &&
      !req.data?.timeInterval
    ) {
      return HttpResponse.badRequest('missing body')
    }

    const { id, name, startDate, endDate, timeInterval } = req.data

    if (name && typeof name !== 'string') {
      return HttpResponse.badRequest('name must be a string')
    }

    if (startDate && typeof startDate !== 'number') {
      return HttpResponse.badRequest('startDate must be a number')
    }

    if (endDate && typeof endDate !== 'number') {
      return HttpResponse.badRequest('endDate must be a number')
    }

    if (timeInterval && typeof timeInterval !== 'number') {
      return HttpResponse.badRequest('timeInterval must be a number')
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
