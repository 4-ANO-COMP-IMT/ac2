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
      !req.data?.notEarlier &&
      !req.data?.notLater &&
      !req.data?.description
    ) {
      return HttpResponse.badRequest('missing body')
    }

    const { name, dates, notEarlier, notLater, description } = req.data

    if (!name) {
      return HttpResponse.badRequest('missing name')
    }

    if (!dates) {
      return HttpResponse.badRequest('missing dates')
    }

    if (!notEarlier && notEarlier !== 0) {
      return HttpResponse.badRequest('missing notEarlier')
    }

    if (!notLater && notLater !== 0) {
      return HttpResponse.badRequest('missing notLater')
    }

    try {
      const event = await this.usecase.call(
        name,
        dates,
        notEarlier,
        notLater,
        description
      )

      return HttpResponse.created<EventJsonProps>(
        'event created',
        event.toJson()
      )
    } catch (error: any) {
      if (error.message.indexOf('Error in entity Event:') != -1) {
        return HttpResponse.badRequest(error.message)
      } else {
        return HttpResponse.internalServerError(error.message)
      }
    }
  }
}
