import axios from 'axios'

import { Member } from '../../../shared/domain/entities/member'
import { environments } from '../../../shared/env/environments'
import { MemberRepositoryInterface } from '../../shared/infra/repos/member_repository_interface'
import { sha256Hash } from '../../../shared/utils/crypto'

const PORT_EVENTBUS = environments.eventBusPort

export interface CreateMemberUsecaseProps {
  repo: MemberRepositoryInterface
  call(
    eventId: string,
    name: string,
    password?: string | undefined
  ): Promise<Member>
}

export class CreateMemberUsecase implements CreateMemberUsecaseProps {
  constructor(public repo: MemberRepositoryInterface) {
    this.repo = repo
  }

  async call(eventId: string, name: string, password?: string | undefined) {
    let response = null
    try {
      // get ip address
      let ip_address = environments.localIpAddress
      response = await axios.post(
        'http://' + ip_address + PORT_EVENTBUS + '/communication',
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
      }
      // event exists
    } else {
      // eventBus is off
      const event = await this.repo.getEvent(eventId)
    }

    const member = await this.repo.getMemberByName(name, eventId)

    if (member) {
      throw new Error('Member already exists with name: ' + name)
    }

    const hashPassword = sha256Hash(password)
    const new_member = await this.repo.createMember(eventId, name, hashPassword)

    // inform to other MSS the creation of a member
    try {
      // get ip address
      let ip_address = environments.localIpAddress

      response = await axios.post(
        'http://' + ip_address + PORT_EVENTBUS + '/communication',
        {
          mss: 'all',
          type: 'createMember',
          params: {
            eventId: eventId,
            memberId: new_member.id,
            name: name,
            password: hashPassword
          }
        }
      )
    } catch (err) {}

    return new_member
  }
}
