import axios from 'axios'

import { environments } from '../../../shared/env/environments'
import { AvailabilityRepositoryInterface } from '../../shared/infra/repos/availability_repository_interface'
import { Availability } from '../../../shared/domain/entities/availability'

const PORT_EVENTBUS = environments.eventBusPort

export interface UpdateAvailabilitiesUsecaseProps {
  repo: AvailabilityRepositoryInterface
  call(
    eventId: string,
    memberId: string,
    availabilities: Availability[]
  ): Promise<Availability[]>
}

export class UpdateAvailabilitiesUsecase
  implements UpdateAvailabilitiesUsecaseProps
{
  constructor(public repo: AvailabilityRepositoryInterface) {
    this.repo = repo
  }

  async call(
    eventId: string,
    memberId: string,
    availabilities: Availability[]
  ) {
    let response = null

    // get ip address
    let ip_address = environments.localIpAddress

    // verify if event exists
    try {
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
        // MSS is off, check locally if event exists
        const event = await this.repo.getEvent(eventId)
      }
      // event exists
    } else {
      // eventBus is off
      const event = await this.repo.getEvent(eventId)
    }

    // verify if member exists
    try {
      // get ip address
      let ip_address = environments.localIpAddress

      response = await axios.post(
        'http://' + ip_address + PORT_EVENTBUS + '/communication',
        {
          mss: 'member',
          type: 'getMember',
          params: {
            eventId: eventId,
            memberId: memberId
          }
        }
      )
    } catch (err) {}
    if (response != null) {
      if (response.status == 404) {
        // member doesn't exist
        throw new Error('Member not found for memberId: ' + memberId)
      } else if (response.status == 500) {
        // MSS is off, check locally if member exists
        const member = await this.repo.getMember(eventId, memberId)
      }
      // event exists
    } else {
      // eventBus is off
      const member = await this.repo.getMember(eventId, memberId)
    }

    const new_availabilities = await this.repo.updateAvailabilities(
      eventId,
      memberId,
      availabilities
    )
    const new_member = await this.repo.getMember(eventId, memberId)

    // inform to other MSS the update of availabilities
    try {
      // get ip address
      let ip_address = environments.localIpAddress

      response = await axios.post(
        'http://' + ip_address + PORT_EVENTBUS + '/communication',
        {
          mss: 'all',
          type: 'updateAvailabilities',
          params: {
            eventId: eventId,
            member: new_member.toJson()
          }
        }
      )
    } catch (err) {}

    return new_availabilities
  }
}
