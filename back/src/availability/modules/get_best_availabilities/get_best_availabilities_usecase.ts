import axios from 'axios'

import { environments } from '../../../shared/env/environments'
import { AvailabilityRepositoryInterface } from '../../shared/infra/repos/availability_repository_interface'
import { Member } from '../../../shared/domain/entities/member'
import { NoBestAvailability } from '../../../shared/domain/helpers/errors/not_found'
import { Event } from '../../../shared/domain/entities/event'
import { Availability } from '../../../shared/domain/entities/availability'

const PORT_EVENTBUS = environments.eventBusPort

type AvailabilityViewmodel = {
  members: {
    id: string
    name: string
  }[]
  startDate: number
  endDate: number
}

export interface GetBestAvailabilitiesUsecaseProps {
  repo: AvailabilityRepositoryInterface
  call(eventId: string): Promise<AvailabilityViewmodel[]>
}

export class GetBestAvailabilitiesUsecase
  implements GetBestAvailabilitiesUsecaseProps
{
  constructor(public repo: AvailabilityRepositoryInterface) {
    this.repo = repo
  }

  async call(eventId: string): Promise<AvailabilityViewmodel[]> {
    let response = null

    // get ip address
    let ip_address = environments.localIpAddress

    let event
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
        event = await this.repo.getEvent(eventId)
      }
      event = new Event(
        response.data.data.id,
        response.data.data.name,
        response.data.data.dates,
        response.data.data.notEarlier,
        response.data.data.notLater,
        response.data.data.members.map((member: any) => {
          return new Member(
            member.id,
            member.name,
            member.availabilities.map((availability: any) => {
              return new Availability(
                availability.id,
                availability.startDate,
                availability.endDate
              )
            })
          )
        }),
        response.data.description
      )

      // event exists
    } else {
      // eventBus is off
      event = await this.repo.getEvent(eventId)
    }

    // check if event have members
    if (event.members == null || event.members.length == 0) {
      throw new NoBestAvailability()
    }

    type AvailabilityViewmodel = {
      startDate: number
      endDate: number
      member: {
        id: string
        name: string
      }
    }

    // get all availabilities as a list with members principal information
    const original_availabilities: AvailabilityViewmodel[] = []
    for (const member of event.members) {
      for (const availability of member.availabilities) {
        original_availabilities.push({
          startDate: availability.startDate,
          endDate: availability.endDate,
          member: {
            id: member.id,
            name: member.name
          }
        })
      }
    }

    // slice availabilities into blocks of 1800000 ms (30 minutes)
    const sliced_availabilities: AvailabilityViewmodel[] = []
    for (const availability of original_availabilities) {
      let current_date = availability.startDate
      while (current_date < availability.endDate) {
        sliced_availabilities.push({
          startDate: current_date,
          endDate:
            current_date + 1800000 < availability.endDate
              ? current_date + 1800000
              : availability.endDate,
          member: availability.member
        })
        current_date += 1800000
      }
    }

    // create a dictionary with relation of all availability and members
    type PossibleAvailabilities = {
      [key: string]: number
    }
    const possible_availabilities: PossibleAvailabilities = {}

    // create a list with the best availabilities
    type AllAvailabilities = {
      startDate: number
      endDate: number
      members: {
        id: string
        name: string
      }[]
    }
    let all_availabilities: AllAvailabilities[] = []

    // create a variable with the best/biggest number of members
    let best_number_of_members = 0

    for (const availability of sliced_availabilities) {
      if (possible_availabilities[availability.startDate] == null) {
        possible_availabilities[availability.startDate] = 1
        all_availabilities.push({
          startDate: availability.startDate,
          endDate: availability.endDate,
          members: [
            {
              id: availability.member.id,
              name: availability.member.name
            }
          ]
        })
      } else {
        possible_availabilities[availability.startDate] += 1
        all_availabilities
          .filter((a) => a.startDate == availability.startDate)[0]
          .members.push({
            id: availability.member.id,
            name: availability.member.name
          })
      }

      if (
        possible_availabilities[availability.startDate] > best_number_of_members
      ) {
        best_number_of_members = possible_availabilities[availability.startDate]
      }
    }

    // check if exist at least one availability
    if (all_availabilities.length == 0) {
      throw new NoBestAvailability()
    }

    // check if the best availabilities's number of members is greater than number of members - 1
    if (best_number_of_members < event!.members.length - 1) {
      // raise a error that represents that there is no best availabilities
      throw new NoBestAvailability()
    } else {
      // get the best availabilities
      all_availabilities = all_availabilities.filter(
        (availability) =>
          possible_availabilities[availability.startDate] ==
          best_number_of_members
      )

      // sort the list by startDate
      all_availabilities.sort((a, b) => a.startDate - b.startDate)

      // verify if exists only 1 availability:
      if (all_availabilities.length == 1) {
        return all_availabilities
      }

      // concatenate availabilites that are continuous
      let new_availabilities = []
      let current_availability = all_availabilities[0]

      for (let i = 1; i < all_availabilities.length; i++) {
        if (current_availability.endDate == all_availabilities[i].startDate) {
          current_availability.endDate = all_availabilities[i].endDate
        } else {
          new_availabilities.push({
            startDate: current_availability.startDate,
            endDate: current_availability.endDate,
            members: current_availability.members
          })
          current_availability = all_availabilities[i]
        }
      }

      // check if last availability exists on new_availabilities variable
      if (
        new_availabilities.length == 0 ||
        new_availabilities[new_availabilities.length - 1].endDate !=
          current_availability.endDate
      ) {
        new_availabilities.push({
          startDate: current_availability.startDate,
          endDate: current_availability.endDate,
          members: current_availability.members
        })
      }

      return new_availabilities
    }
  }
}
