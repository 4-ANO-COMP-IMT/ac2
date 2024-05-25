import { EventJsonProps } from '../../../shared/domain/entities/event'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { PostEventUsecase } from './post_event_usecase'
import { PostEventRequest } from './protocols'

interface PostEventControllerProps {
  usecase: PostEventUsecase
  call(
    req: HttpRequest<PostEventRequest>
  ): Promise<HttpResponse<EventJsonProps> | HttpResponse<Error>>
}

export class PostEventController implements PostEventControllerProps {
  constructor(public usecase: PostEventUsecase) {
    this.usecase = usecase
  }

  async call(req: HttpRequest<PostEventRequest>) {
    if (!req.data) {
      return HttpResponse.badRequest('missing data')
    }

    const { name, startDate, endDate, timeInterval } = req.data

    try {
      const event = await this.usecase.call(id)

      return HttpResponse.ok<EventJsonProps>('event found', event.toJson())
    } catch (error: any) {
      if (error.message.includes('not found')) {
        return HttpResponse.notFound(error.message)
      }

      return HttpResponse.internalServerError(error.message)
    }
  }
}
