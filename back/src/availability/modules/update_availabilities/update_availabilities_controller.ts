import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { UpdateAvailabilitiesUsecase } from './update_availabilities_usecase'
import { UpdateAvailabilitiesRequest } from './protocols'
import { Availability, AvailabilityJsonProps } from '../../../shared/domain/entities/availability'
import { v4 as uuid } from 'uuid'

interface UpdateAvailabilitiesControllerProps {
  usecase: UpdateAvailabilitiesUsecase
  call(
    req: HttpRequest<UpdateAvailabilitiesRequest>
  ): Promise<HttpResponse<AvailabilityJsonProps[]> | HttpResponse<Error>>
}

export class UpdateAvailabilitiesController implements UpdateAvailabilitiesControllerProps {
  constructor(public usecase: UpdateAvailabilitiesUsecase) {
    this.usecase = usecase
  }

  async call(req: HttpRequest<UpdateAvailabilitiesRequest>) {
    if (
      !req.data?.eventId &&
      !req.data?.memberId &&
      !req.data?.availabilities
    ) {
      return HttpResponse.badRequest('missing body')
    }

    const { eventId, memberId, availabilities } = req.data

    if (!eventId) {
      return HttpResponse.badRequest('missing eventId')
    }

    if (!memberId) {
      return HttpResponse.badRequest('missing memberId')
    }

    if (!availabilities) {
      return HttpResponse.badRequest('missing availabilities')
    }
    const availabilitiesAsEntity = availabilities.map(
      (availability) => new Availability(uuid(), availability.startDate, availability.endDate)
    )

    try {
      const availabilitiesResponse = await this.usecase.call(
        eventId,
        memberId,
        availabilitiesAsEntity
      )

      return HttpResponse.ok<AvailabilityJsonProps[]>(
        'availabilities updated',
        availabilitiesResponse.map((availability) => availability.toJson())
      )
      
    } catch (error: any) {
      if (error.message.indexOf('Error in entity Availability:') != -1) {
        return HttpResponse.badRequest(error.message)
      } else if (error.message.indexOf('not found') != -1) {
        return HttpResponse.notFound(error.message)
      } else {
        return HttpResponse.internalServerError(error.message)
      }
    }
  }
}
