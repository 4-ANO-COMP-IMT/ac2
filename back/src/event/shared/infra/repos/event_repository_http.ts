import { Event } from '../../../../shared/domain/entities/event'
import { NotFoundError } from '../../../../shared/domain/helpers/errors/not_found'
import { EventRepositoryInterface } from './event_repository_interface'

// type FetchProps = {
//   id: string
//   name: string
//   startDate: number
//   endDate: number
//   timeInterval: number
//   message?: string
// }

export class EventRepositoryHttp implements EventRepositoryInterface {
  // async getEvent(id: string): Promise<Event> {
  //   try {
  //     const response = await fetch(`http://localhost:8000/event/${id}`, {
  //       method: 'GET'
  //     })
  //     const eventResponse: FetchProps = await response.json()

  //     if (eventResponse.message) throw new NotFoundError('event')

  //     const event = new Event(
  //       eventResponse.id,
  //       eventResponse.name,
  //       eventResponse.startDate,
  //       eventResponse.endDate,
  //       eventResponse.timeInterval
  //     )

  //     return event
  //   } catch (error: any) {
  //     throw new Error(error.message)
  //   }
  // }

  async createEvent(): Promise<Event> {
    throw new Error('Method not implemented.')
  }

}
