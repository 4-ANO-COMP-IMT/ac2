import { ScheduleJsonProps } from '../../../shared/domain/entities/schedule'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { HttpRequest } from './../../../shared/domain/helpers/http/http_request'
import { GetSchedulesByEventUsecase } from './get_schedules_by_event_usecase'
import { GetSchedulesByEventRequest } from './protocols'

interface GetSchedulesByEventControlerProps {
  usecase: GetSchedulesByEventUsecase
  call(
    req: HttpRequest<GetSchedulesByEventRequest>
  ): Promise<HttpResponse<ScheduleJsonProps[]> | HttpResponse<Error>>
}

export class GetSchedulesByEventController
  implements GetSchedulesByEventControlerProps
{
  constructor(public usecase: GetSchedulesByEventUsecase) {
    this.usecase = usecase
  }

  async call(req: HttpRequest<GetSchedulesByEventRequest>) {
    const eventId = req.data?.eventId

    if (!eventId) {
      return HttpResponse.badRequest('eventId is required')
    }

    try {
      const schedules = await this.usecase.call(eventId)

      return HttpResponse.ok<ScheduleJsonProps[]>(
        'schedules found',
        schedules.map((schedule) => schedule.toJson())
      )
    } catch (error: any) {
      if (error.message.includes('not found')) {
        return HttpResponse.notFound(error.message)
      }

      return HttpResponse.internalServerError(error.message)
    }
  }
}
