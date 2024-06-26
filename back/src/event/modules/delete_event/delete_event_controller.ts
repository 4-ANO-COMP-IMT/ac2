// import { EventJsonProps } from '../../../shared/domain/entities/event'
// import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
// import {
//   Error,
//   HttpResponse
// } from '../../../shared/domain/helpers/http/http_response'
// import { DeleteEventUsecase } from './delete_event_usecase'
// import { DeleteEventRequest } from './protocols'

// interface DeleteEventControllerProps {
//   usecase: DeleteEventUsecase
//   call(
//     req: HttpRequest<DeleteEventRequest>
//   ): Promise<HttpResponse<EventJsonProps> | HttpResponse<Error>>
// }

// export class DeleteEventController implements DeleteEventControllerProps {
//   constructor(public usecase: DeleteEventUsecase) {
//     this.usecase = usecase
//   }

//   async call(req: HttpRequest<DeleteEventRequest>) {
//     const id = req.data?.id

//     if (!id) {
//       return HttpResponse.badRequest('id is required')
//     }

//     try {
//       const event = await this.usecase.call(id)

//       return HttpResponse.ok<EventJsonProps>('event deleted', event.toJson())
//     } catch (error: any) {
//       if (error.message.includes('not found')) {
//         return HttpResponse.notFound(error.message)
//       }

//       return HttpResponse.internalServerError(error.message)
//     }
//   }
// }
