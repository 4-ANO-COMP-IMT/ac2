import { MemberContext } from '@/contexts/member-context'
import { Member } from '@/types/member'
import { Response } from '@/types/response'
import { LoginFormValues } from '@/types/schemas/login-form-schema'
import { api } from '@/utils/http/api'
import { useContext } from 'react'

export const useMember = () => {
  const context = useContext(MemberContext)

  if (!context) {
    throw new Error('useMember must be used within a MemberProvider')
  }

  const { member, setMember } = context

  const createMember = async (
    data: LoginFormValues
  ): Promise<Response<Member>> => {
    const request = {
      eventId: data.eventId,
      name: data.username,
      password: data.password
    }

    const response = await api.post('/member/', request)

    setMember(response.data.data)

    return response.data.data
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
    loginMember,
    member,
    setMember
  }
}
