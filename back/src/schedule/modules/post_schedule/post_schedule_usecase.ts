import { Schedule } from '../../../shared/domain/entities/schedule'
import { ScheduleRepositoryInterface } from '../../shared/infra/repos/schedule_repository_interface'
import { v4 as uuidv4 } from 'uuid'

export interface PostScheduleUsecaseProps {
  repo: ScheduleRepositoryInterface
  call(eventId: string, time: number, name: string): Promise<Schedule>
}

export class PostScheduleUsecase implements PostScheduleUsecaseProps {
  constructor(public repo: ScheduleRepositoryInterface) {
    this.repo = repo
  }
  
  async call(eventId: string, time: number, name: string) {

    // TODO: Verify if event exists
    
    return await this.repo.createSchedule({
      id: uuidv4(),
      eventId,
      time,
      name
    })
  }
}
