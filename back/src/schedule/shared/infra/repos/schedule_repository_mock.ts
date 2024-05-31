import { v4 as uuidv4 } from 'uuid'

import { Schedule } from '../../../../shared/domain/entities/schedule'
import { NotFoundError } from '../../../../shared/domain/helpers/errors/not_found'
import { ScheduleRepositoryInterface } from './schedule_repository_interface'

export class ScheduleRepositoryMock implements ScheduleRepositoryInterface {
  static schedules = [
    new Schedule(
      '3bdea174-7ae8-474b-a649-93be4620bba6',
      '1',
      1632940200000, // 1632940200000 = 29/09/2021 18:30:00 (GMT-3)
      'Vini'
    ),
    new Schedule(
      '17d97cbb-d308-47c8-bb83-ddc7116d23fd',
      '1',
      1632940200000, // 1632940200000 = 29/09/2021 18:30:00 (GMT-3)
      'Bossini'
    ),
    new Schedule(
      'c8a559fc-6794-4587-84f5-a3efc2392921',
      '1',
      1632940200000, // 1632940200000 = 29/09/2021 18:30:00 (GMT-3)
      'Soller'
    ),

    new Schedule(
      '77f361af-7e88-409b-92c0-cdeae2f19399',
      '2',
      1632940200000, // 1632940200000 = 29/09/2021 18:30:00 (GMT-3)
      'Sakamoto'
    ),
    new Schedule(
      '3fde5c12-cfee-46d8-9469-d77de8370739',
      '2',
      1632942000000, // 1632942000000 = 29/09/2021 19:00:00 (GMT-3)
      'Flavio'
    ),
    new Schedule(
      'ba096c65-bca0-4242-98b1-383e85f6e930',
      '2',
      1632942000000, // 1632942000000 = 29/09/2021 19:00:00 (GMT-3)
      'João'
    ),

    new Schedule(
      '26d391f9-96b2-408e-89c6-5afc0ac2ec92',
      '3',
      1632939300000, // 1632940200000 = 29/09/2021 18:15:00 (GMT-3)
      'Matumoto'
    ),
    new Schedule(
      '04becde3-2b94-4a7b-967c-897b9426c432',
      '3',
      1632942000000, // 1632940200000 = 29/09/2021 19:00:00 (GMT-3)
      'Bossini'
    )
  ]

  getSchedulesByEventId(eventId: string): Promise<Schedule[]> {
    const schedules = ScheduleRepositoryMock.schedules.filter(
      (schedule) => schedule.eventId === eventId
    )
    return Promise.resolve(schedules)
  }

  createSchedule(schedule: {
    eventId: string
    time: number
    name: string
  }): Promise<Schedule> {
    const newSchedule = new Schedule(
      uuidv4(),
      schedule.eventId,
      schedule.time,
      schedule.name
    )

    ScheduleRepositoryMock.schedules.push(newSchedule)

    return Promise.resolve(newSchedule)
  }

  deleteSchedule(scheduleId: string): Promise<Schedule> {
    const scheduleIndex = ScheduleRepositoryMock.schedules.findIndex(
      (schedule) => schedule.id === scheduleId
    )

    if (scheduleIndex === -1) {
      throw new NotFoundError('schedule')
    }

    const schedule = ScheduleRepositoryMock.schedules[scheduleIndex]
    ScheduleRepositoryMock.schedules.splice(scheduleIndex, 1)

    return Promise.resolve(schedule)
  }

  resetMock() {
    ScheduleRepositoryMock.schedules = [
      new Schedule(
        '3bdea174-7ae8-474b-a649-93be4620bba6',
        '1',
        1632940200000, // 1632940200000 = 29/09/2021 18:30:00 (GMT-3)
        'Vini'
      ),
      new Schedule(
        '17d97cbb-d308-47c8-bb83-ddc7116d23fd',
        '1',
        1632940200000, // 1632940200000 = 29/09/2021 18:30:00 (GMT-3)
        'Bossini'
      ),
      new Schedule(
        'c8a559fc-6794-4587-84f5-a3efc2392921',
        '1',
        1632940200000, // 1632940200000 = 29/09/2021 18:30:00 (GMT-3)
        'Soller'
      ),

      new Schedule(
        '77f361af-7e88-409b-92c0-cdeae2f19399',
        '2',
        1632940200000, // 1632940200000 = 29/09/2021 18:30:00 (GMT-3)
        'Sakamoto'
      ),
      new Schedule(
        '3fde5c12-cfee-46d8-9469-d77de8370739',
        '2',
        1632942000000, // 1632942000000 = 29/09/2021 19:00:00 (GMT-3)
        'Flavio'
      ),
      new Schedule(
        'ba096c65-bca0-4242-98b1-383e85f6e930',
        '2',
        1632942000000, // 1632942000000 = 29/09/2021 19:00:00 (GMT-3)
        'João'
      ),

      new Schedule(
        '26d391f9-96b2-408e-89c6-5afc0ac2ec92',
        '3',
        1632939300000, // 1632940200000 = 29/09/2021 18:15:00 (GMT-3)
        'Matumoto'
      ),
      new Schedule(
        '04becde3-2b94-4a7b-967c-897b9426c432',
        '3',
        1632942000000, // 1632940200000 = 29/09/2021 19:00:00 (GMT-3)
        'Bossini'
      )
    ]
  }
}
