import { ScheduleJsonProps } from '../../../shared/domain/entities/schedule'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { PostScheduleUsecase } from './post_schedule_usecase'
import { PostScheduleRequest } from './protocols'

interface PostScheduleControllerProps {
  usecase: PostScheduleUsecase
  call(
    req: HttpRequest<PostScheduleRequest>
  ): Promise<HttpResponse<ScheduleJsonProps> | HttpResponse<Error>>
}

export class PostScheduleController implements PostScheduleControllerProps {
  constructor(public usecase: PostScheduleUsecase) {
    this.usecase = usecase
  }

  async call(req: HttpRequest<PostScheduleRequest>) {
    if (!req.data?.eventId && !req.data?.name && !req.data?.time) {
      return HttpResponse.badRequest('missing body')
    }

    const { eventId, name, time } = req.data

    if (!eventId) {
      return HttpResponse.badRequest('missing eventId')
    }

    if (!name) {
      return HttpResponse.badRequest('missing name')
    }

    if (!time) {
      return HttpResponse.badRequest('missing time')
    }

    try {
      const schedule = await this.usecase.call(eventId, time, name)

      return HttpResponse.created<ScheduleJsonProps>(
        'schedule created',
        schedule.toJson()
      )
    } catch (error: any) {
      return HttpResponse.internalServerError(error.message)
    }
  }
}
