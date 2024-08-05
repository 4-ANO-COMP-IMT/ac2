import { EventJsonProps } from '../../../shared/domain/entities/event'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { GetEventUsecase } from './get_event_usecase'
import { GetEventRequest } from './protocols'

interface GetEventControllerProps {
  usecase: GetEventUsecase
  call(
    req: HttpRequest<GetEventRequest>
  ): Promise<HttpResponse<EventJsonProps> | HttpResponse<Error>>
}

export class GetEventController implements GetEventControllerProps {
  constructor(public usecase: GetEventUsecase) {
    this.usecase = usecase
  }

  async call(req: HttpRequest<GetEventRequest>) {
    if (
      !req.data?.eventId
    ) {
      return HttpResponse.badRequest('missing body')
    }

    const { eventId } = req.data


    try {
      const event = await this.usecase.call(
        eventId
      )

      return HttpResponse.ok<EventJsonProps>(
        'event found',
        event.toJson()
      )
    } catch (error: any) {
      if (error.message.indexOf('Error in entity Event:') != -1) {
        return HttpResponse.badRequest(error.message)
      } else if (error.message.indexOf('Event not found for eventId:') != -1) {
        return HttpResponse.notFound(error.message)
      } else {
        return HttpResponse.internalServerError(error.message)
      }
    }
  }
}
