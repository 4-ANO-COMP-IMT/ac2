import axios from 'axios'

import { environments } from '../../../shared/env/environments'
import { AvailabilityRepositoryInterface } from '../../shared/infra/repos/availability_repository_interface'
import { Availability } from '../../../shared/domain/entities/availability'
import { Member } from '../../../shared/domain/entities/member'
import { NoBestAvailability } from '../../../shared/domain/helpers/errors/not_found'
import { BSON } from 'mongodb'

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

    let event
    // verify if event exists
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
        // MSS is off, check locally if event exists
        event = await this.repo.getEvent(eventId)
      }
      event = response.data

      // event exists
    } else {
      // eventBus is off
      event = await this.repo.getEvent(eventId)
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

    // caso a lista de membros não seja um object, retorna um erro
    if (event.data.members.length === 0) {
      return []
    }

    // transformar o object em Member
    const members = event.data.members

    event.members = members.map((member: any) => {
      return new Member(member.id, member.name, member.availabilities)
    })

    //caso nao tenha avaliabilidades, retorna um erro

    for (const member of event!.members) {
      if (member.availabilities.length === 0) {
        return []
      }
      for (const availability of member.availabilities) {
        if (possible_availabilities[availability.startDate] == null) {
          possible_availabilities[availability.startDate] = 1
          all_availabilities.push({
            startDate: availability.startDate,
            endDate: availability.endDate,
            members: [
              {
                id: member.id,
                name: member.name
              }
            ]
          })
        } else {
          possible_availabilities[availability.startDate] += 1
          all_availabilities
            .filter((a) => a.startDate == availability.startDate)[0]
            .members.push({
              id: member.id,
              name: member.name
            })
        }

        if (
          possible_availabilities[availability.startDate] >
          best_number_of_members
        ) {
          best_number_of_members =
            possible_availabilities[availability.startDate]
        }
      }
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
