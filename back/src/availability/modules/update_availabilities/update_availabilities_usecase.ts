import axios from 'axios'
import { response } from 'express'

import { Event } from '../../../shared/domain/entities/event'
import { environments } from '../../../shared/env/environments'
import { EventRepositoryInterface } from '../../shared/infra/repos/event_repository_interface'

const PORT_EVENTBUS = environments.eventBusPort
export interface CreateEventUsecaseProps {
  repo: EventRepositoryInterface
  call(
    name: string,
    dates: number[],
    notEarlier: number,
    notLater: number,
    description?: string | undefined
  ): Promise<Event>
}

export class CreateEventUsecase implements CreateEventUsecaseProps {
  constructor(public repo: EventRepositoryInterface) {
    this.repo = repo
  }

  async call(
    name: string,
    dates: number[],
    notEarlier: number,
    notLater: number,
    description?: string
  ) {
    const response = await this.repo.createEvent(
      name,
      dates,
      notEarlier,
      notLater,
      description
    )
    const idEvent = response.id
    try {
      await axios.post('http://localhost:' + PORT_EVENTBUS + '/communication', {
        mss: 'all',
        type: 'createEvent',
        params: {
          id: idEvent,
          name: name,
          dates: dates,
          notEarlier: notEarlier,
          notLater: notLater,
          description: description
        }
      })
    } catch (err) {}
    return response
  }
}
