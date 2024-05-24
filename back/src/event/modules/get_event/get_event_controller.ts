import { HttpRequest } from './../../../shared/domain/helpers/http/http_request'
import { GetEventUsecase } from './get_event_usecase'
import { GetEventRequest } from './protocols'
import { Error, HttpResponse } from '../../../shared/domain/helpers/http/http_response'
import { EventJsonProps } from '../../../shared/domain/entities/event'

interface GetEventControllerProps {
  usecase: GetEventUsecase
  call(req: HttpRequest<GetEventRequest>): Promise<HttpResponse<EventJsonProps> | HttpResponse<Error>>
}

export class GetEventController implements GetEventControllerProps {
  constructor(public usecase: GetEventUsecase) {
    this.usecase = usecase
  }

  async call(req: HttpRequest<GetEventRequest>) {
    const id = req.data?.id

    if (!id) {
      return HttpResponse.badRequest('id is required')
    }

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
