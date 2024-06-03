import { Schedule } from '../../../shared/domain/entities/schedule'
import { ScheduleRepositoryInterface } from '../../shared/infra/repos/schedule_repository_interface'

export interface GetSchedulesByEventUsecaseProps {
  repo: ScheduleRepositoryInterface
  call(id: string): Promise<Schedule[]>
}

export class GetSchedulesByEventUsecase
  implements GetSchedulesByEventUsecaseProps
{
  constructor(public repo: ScheduleRepositoryInterface) {
    this.repo = repo
  }

  async call(id: string) {
    return await this.repo.getSchedulesByEventId(id)
  }
}
