import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { GetBestAvailabilitiesUsecase } from './get_best_availabilities_usecase'
import { BestAvailabilitiesProps, GetBestAvailabilitiesRequest } from './protocols'

interface GetBestAvailabilitiesControllerProps {
  usecase: GetBestAvailabilitiesUsecase
  call(
    req: HttpRequest<GetBestAvailabilitiesRequest>
  ): Promise<HttpResponse<BestAvailabilitiesProps | Error>>
}

export class GetBestAvailabilitiesController implements GetBestAvailabilitiesControllerProps {
  constructor(public usecase: GetBestAvailabilitiesUsecase) {}

  async call(req: HttpRequest<GetBestAvailabilitiesRequest>): Promise<HttpResponse<BestAvailabilitiesProps | Error>> {
    if (!req.data?.eventId) {
      return HttpResponse.badRequest('missing eventId')
    }

    const { eventId } = req.data

    try {
      const availabilities = await this.usecase.call(eventId)

      return HttpResponse.ok<BestAvailabilitiesProps>('best availabilities found', availabilities)
    } catch (error: any) {
      if (error.message.includes('Error in entity Event:')) {
        return HttpResponse.badRequest(error.message)
      } else if (error.message.includes('Event not found for eventId:')) {
        return HttpResponse.notFound(error.message)
      } else if (error.message.includes('No best availability found')) {
        return HttpResponse.notFound(error.message)
      } else {
        return HttpResponse.internalServerError(error.message)
      }
    }
  }
}
