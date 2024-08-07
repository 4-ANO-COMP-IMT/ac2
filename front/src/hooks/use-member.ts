import { Member } from '@/types/member'
import { Response } from '@/types/response'
import { LoginFormValues } from '@/types/schemas/login-form-schema'
import { api } from '@/utils/http/api'

export const useMember = () => {
  const createMember = async (
    data: LoginFormValues
  ): Promise<Response<Member>> => {
    const request = {
      eventId: data.eventId,
      name: data.username,
      password: data.password
    }

    const response = await api.post('/member/', request)

    return response.data
  }

  const loginMember = async (
    data: LoginFormValues
  ): Promise<Response<boolean>> => {
    const request = {
      eventId: data.eventId,
      name: data.username,
      password: data.password
    }

    const response = await api.post('/member/login', request)

    return response.data
  }

  return {
    createMember,
    loginMember
  }
}
