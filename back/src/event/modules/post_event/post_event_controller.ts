// import { EventJsonProps } from '../../../shared/domain/entities/event'
// import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
// import {
//   Error,
//   HttpResponse
// } from '../../../shared/domain/helpers/http/http_response'
// import { PostEventUsecase } from './post_event_usecase'
// import { PostEventRequest } from './protocols'

// interface PostEventControllerProps {
//   usecase: PostEventUsecase
//   call(
//     req: HttpRequest<PostEventRequest>
//   ): Promise<HttpResponse<EventJsonProps> | HttpResponse<Error>>
// }

// export class PostEventController implements PostEventControllerProps {
//   constructor(public usecase: PostEventUsecase) {
//     this.usecase = usecase
//   }

//   async call(req: HttpRequest<PostEventRequest>) {
//     if (
//       !req.data?.name &&
//       !req.data?.startDate &&
//       !req.data?.endDate &&
//       !req.data?.timeInterval
//     ) {
//       return HttpResponse.badRequest('missing body')
//     }

//     const { name, startDate, endDate, timeInterval } = req.data

//     if (!name) {
//       return HttpResponse.badRequest('missing name')
//     }

//     if (!startDate) {
//       return HttpResponse.badRequest('missing startDate')
//     }

//     if (!endDate) {
//       return HttpResponse.badRequest('missing endDate')
//     }

//     if (!timeInterval) {
//       return HttpResponse.badRequest('missing timeInterval')
//     }

//     try {
//       const event = await this.usecase.call(
//         name,
//         startDate,
//         endDate,
//         timeInterval
//       )

//       return HttpResponse.created<EventJsonProps>(
//         'event created',
//         event.toJson()
//       )
//     } catch (error: any) {
//       return HttpResponse.internalServerError(error.message)
//     }
//   }
// }
