import { MemberJsonProps } from '../../../shared/domain/entities/member'

export type CommunicationRequest = {
  mss: string
  type: string
  params: any
}

export type CommunicationResponse = {
  status: number
  message: string
  member?: MemberJsonProps
}
