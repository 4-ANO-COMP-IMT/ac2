import { EventJsonProps } from '../../../shared/domain/entities/event'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { CreateEventUsecase } from './create_event_usecase'
import { CreateEventRequest } from './protocols'

interface CreateEventControllerProps {
  usecase: CreateEventUsecase
  call(
    req: HttpRequest<CreateEventRequest>
  ): Promise<HttpResponse<EventJsonProps> | HttpResponse<Error>>
}

export class CreateEventController implements CreateEventControllerProps {
  constructor(public usecase: CreateEventUsecase) {
    this.usecase = usecase
  }

  async call(req: HttpRequest<CreateEventRequest>) {
    if (
      !req.data?.name &&
      !req.data?.dates &&
      !req.data?.startDate &&
      !req.data?.endDate &&
      !req.data?.timeInterval
    ) {
      return HttpResponse.badRequest('missing body')
    }

    const { name, dates, startDate, endDate, timeInterval } = req.data

    if (!name) {
      return HttpResponse.badRequest('missing name')
    }

    if (!dates) {
      return HttpResponse.badRequest('missing dates')
    }

    if (!startDate) {
      return HttpResponse.badRequest('missing startDate')
    }

    if (!endDate) {
      return HttpResponse.badRequest('missing endDate')
    }

    if (!timeInterval) {
      return HttpResponse.badRequest('missing timeInterval')
    }

    try {
      const event = await this.usecase.call(
        name,
        dates,
        startDate,
        endDate,
        timeInterval
      )

      return HttpResponse.created<EventJsonProps>(
        'event created',
        event.toJson()
      )
    } catch (error: any) {
      return HttpResponse.internalServerError(error.message)
    }
  }
}