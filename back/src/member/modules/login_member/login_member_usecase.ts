import axios from 'axios'
import { environments } from '../../../shared/env/environments'
import { MemberRepositoryInterface } from '../../shared/infra/repos/member_repository_interface'

const PORT_EVENTBUS = environments.eventBusPort

export interface LoginMemberUsecaseProps {
  repo: MemberRepositoryInterface
  call(
    eventId: string,
    name: string,
    password: string
  ): Promise<boolean>
}

export class LoginMemberUsecase implements LoginMemberUsecaseProps {
  constructor(public repo: MemberRepositoryInterface) {
    this.repo = repo
  }

  async call(eventId: string, name: string, password: string) {
    let response = null
    try {
      response = await axios.post(
        'http://localhost:' + PORT_EVENTBUS + '/communication',
        {
          mss: 'event',
          type: 'getEvent',
          params: {
            id: eventId
          }
        }
      )
    } catch (err) {}
    if (response != null) {
      if (response.status == 404) {
        // event doesn't exist
        throw new Error('Event not found for eventId: ' + eventId)
      } else if (response.status == 500) {
        // MSS is off
        const event = await this.repo.getEvent(eventId)
      } else {
      }
      // event exists
    } else {
      // eventBus is off
      const event = await this.repo.getEvent(eventId)
    }

    const member = await this.repo.getMemberByName(name, eventId)

    if (!member) {
      throw new Error('Member does not exists with name: ' + name)
    }

    // validate password if exists
    if (member.password){
      if (member.password != password) {
        return false
      }
    }
    return true
  }
}
