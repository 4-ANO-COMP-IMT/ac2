import { MemberJsonProps } from '../../../shared/domain/entities/member'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { CreateMemberUsecase } from './login_member_usecase'
import { CreateMemberRequest } from './protocols'

interface CreateMemberControllerProps {
  usecase: CreateMemberUsecase
  call(
    req: HttpRequest<CreateMemberRequest>
  ): Promise<HttpResponse<MemberJsonProps | Error>>
}

export class CreateMemberController implements CreateMemberControllerProps {
  constructor(public usecase: CreateMemberUsecase) {
    this.usecase = usecase
  }

  async call(req: HttpRequest<CreateMemberRequest>) {
    if (!req.data?.eventId && !req.data?.name) {
      return HttpResponse.badRequest('missing body')
    }

    const { eventId, name, password } = req.data

    if (!name) {
      return HttpResponse.badRequest('missing name')
    }

    if (!eventId) {
      return HttpResponse.badRequest('missing eventId')
    }

    try {
      const member = await this.usecase.call(eventId, name, password)

      return HttpResponse.created<MemberJsonProps>(
        'member created',
        member.toJson()
      )
    } catch (error: any) {
      if (error.message.indexOf('Error in entity Member:') != -1) {
        return HttpResponse.badRequest(error.message)
      } else if (error.message.indexOf('not found') != -1) {
        return HttpResponse.notFound(error.message)
      } else if (error.message.indexOf('already exists') != -1) {
        return HttpResponse.conflict(error.message)
      } else {
        console.log(error.message)
        return HttpResponse.internalServerError(error.message)
      }
    }
  }
}
