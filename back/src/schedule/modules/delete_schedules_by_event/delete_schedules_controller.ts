import { ScheduleJsonProps } from '../../../shared/domain/entities/schedule'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { DeleteScheduleUsecase } from './delete_schedules_usecase'
import { DeleteScheduleRequest } from './protocols'

interface DeleteScheduleControlerProps {
  usecase: DeleteScheduleUsecase
  call(
    req: HttpRequest<DeleteScheduleRequest>
  ): Promise<HttpResponse<ScheduleJsonProps> | HttpResponse<Error>>
}

export class DeleteScheduleController implements DeleteScheduleControlerProps {
  constructor(public usecase: DeleteScheduleUsecase) {
    this.usecase = usecase
  }

  async call(req: HttpRequest<DeleteScheduleRequest>) {
    const scheduleId = req.data?.id

    if (!scheduleId) {
      return HttpResponse.badRequest('scheduleId is required')
    }

    try {
      const schedule = await this.usecase.call(scheduleId)

      return HttpResponse.ok<ScheduleJsonProps>(
        'schedule deleted',
        schedule.toJson()
      )
    } catch (error: any) {
      if (error.message.toLowerCase().includes('not found')) {
        return HttpResponse.notFound(error.message)
      }

      return HttpResponse.internalServerError(error.message)
    }
  }
}
