import { AvailabilityJsonProps } from '../../../shared/domain/entities/availability'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { GetBestAvailabilitiesUsecase } from './get_best_availabilities_usecase'
import { UpdateAvailabilitiesRequest } from './protocols'

interface GetBestAvailabilitiesControllerProps {
  usecase: GetBestAvailabilitiesUsecase
  call(
    req: HttpRequest<UpdateAvailabilitiesRequest>
  ): Promise<HttpResponse<AvailabilityJsonProps> | HttpResponse<Error>>
}

export class GetBestAvailabilitiesController implements GetBestAvailabilitiesControllerProps {
  constructor(public usecase: GetBestAvailabilitiesUsecase) {
    this.usecase = usecase
  }

  async call(req: HttpRequest<UpdateAvailabilitiesRequest>) {
    if (!req.data?.eventId) {
      return HttpResponse.badRequest('missing eventId')
    }

    const { eventId } = req.data

    try {
      const event = await this.usecase.call(eventId)

      return HttpResponse.ok<AvailabilityJsonProps>('event found', event.toJson())
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
