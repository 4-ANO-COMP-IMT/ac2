import { Schedule } from '../../../shared/domain/entities/schedule'
import { ScheduleRepositoryInterface } from '../../shared/infra/repos/schedule_repository_interface'

export interface DeleteScheduleUsecaseProps {
  repo: ScheduleRepositoryInterface
  call(id: string): Promise<Schedule>
}

export class DeleteScheduleUsecase implements DeleteScheduleUsecaseProps {
  constructor(public repo: ScheduleRepositoryInterface) {
    this.repo = repo
  }

  async call(id: string) {
    return await this.repo.deleteSchedule(id)
  }
}
