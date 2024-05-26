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
    const id = req.data?.id
    const name = req.data?.name
    const start_date = req.data?.start_date
    const end_date = req.data?.end_date
    const time_interval = req.data?.time_interval

    if (!id) {
      return HttpResponse.badRequest('id is required')
    }

    try {
      const event_Response = await this.usecase.call(
        id,
        name,
        start_date,
        end_date,
        time_interval
      )

      return HttpResponse.ok<EventJsonProps>(
        'event changed successfully',
        event_Response.toJson()
      )
    } catch (error: any) {
      if (error.message.includes('not found')) {
        return HttpResponse.notFound(error.message)
      }

      return HttpResponse.internalServerError(error.message)
    }
  }
}
