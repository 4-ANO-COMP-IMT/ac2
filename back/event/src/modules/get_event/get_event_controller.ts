import { httpStatusCode } from '../../shared/domain/helpers/http'
import { GetEventUsecase } from './get_event_usecase'
import { GetEventRequest, GetEventResponse } from './protocols'

interface GetEventControllerProps {
  usecase: GetEventUsecase
  call(req: GetEventRequest): Promise<GetEventResponse>
}

export class GetEventController implements GetEventControllerProps {
  constructor(public usecase: GetEventUsecase) {
    this.usecase = usecase
  }

  async call(req: GetEventRequest) {
    const id = req.params.id

    if (!id) {
      return {
        status: httpStatusCode.BAD_REQUEST,
        message: 'id is undefined'
      }
    }

    try {
      const event = await this.usecase.call(id)

      return {
        status: httpStatusCode.OK,
        message: 'event found',
        event: event.toJson()
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message.includes('not found')) {
        return {
          status: httpStatusCode.NOT_FOUND,
          message: error.message
        }
      }

      return {
        status: httpStatusCode.INTERNAL_SERVER_ERROR,
        message: error.message
      }
    }
  }
}
