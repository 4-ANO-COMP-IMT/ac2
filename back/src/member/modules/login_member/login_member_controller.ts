import { MemberJsonProps } from '../../../shared/domain/entities/member'
import { HttpRequest } from '../../../shared/domain/helpers/http/http_request'
import {
  Error,
  HttpResponse
} from '../../../shared/domain/helpers/http/http_response'
import { LoginMemberUsecase } from './login_member_usecase'
import { LoginMemberRequest } from './protocols'

interface LoginMemberControllerProps {
  usecase: LoginMemberUsecase
  call(
    req: HttpRequest<LoginMemberRequest>
  ): Promise<HttpResponse<boolean | Error>>
}

export class LoginMemberController implements LoginMemberControllerProps {
  constructor(public usecase: LoginMemberUsecase) {
    this.usecase = usecase
  }

  async call(req: HttpRequest<LoginMemberRequest>) {
    if (!req.data?.eventId && !req.data?.name && !req.data?.password) {
      return HttpResponse.badRequest('missing body')
    }

    const { eventId, name, password } = req.data

    if (!name) {
      return HttpResponse.badRequest('missing name')
    }

    if (!eventId) {
      return HttpResponse.badRequest('missing eventId')
    }

    if (!password) {
      return HttpResponse.badRequest('missing password')
    }

    try {
      const validation = await this.usecase.call(eventId, name, password)

      if (!validation) {
        return HttpResponse.unauthorized('invalid credentials for user ' + name)
      }
      else {
        return HttpResponse.ok<boolean>('user logged in', validation)
      }

    } catch (error: any) {
      if (error.message.indexOf('Error in entity Member:') != -1) {
        return HttpResponse.badRequest(error.message)
      } else if (error.message.indexOf('not found') != -1) {
        return HttpResponse.notFound(error.message)
      } else if (error.message.indexOf('does not exists') != -1) {
        return HttpResponse.notFound(error.message)
      } else {
        console.log(error.message)
        return HttpResponse.internalServerError(error.message)
      }
    }
  }
}
