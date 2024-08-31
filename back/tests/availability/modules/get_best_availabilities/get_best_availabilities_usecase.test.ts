import { expect, test, describe, it } from 'vitest'

import { GetBestAvailabilitiesUsecase } from '../../../../src/availability/modules/get_best_availabilities/get_best_availabilities_usecase'
import { AvailabilityRepositoryMock } from '../../../../src/availability/shared/infra/repos/availability_repository_mock'
import { Availability } from '../../../../src/shared/domain/entities/availability'
import { Event } from '../../../../src/shared/domain/entities/event'
import { Member } from '../../../../src/shared/domain/entities/member'

// increase data base for coverage all test (resetMock only on the last test)
test('Test get best availabilities usecase success only 1 availability', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)
  
  AvailabilityRepositoryMock.events = [
    new Event(
      'event-1',
      'Reunião Básica',
      [1719781200000], 
      32400000,
      75600000,
      [
        new Member('member-1', 'Membro 1', [
          new Availability('availability-1', 1719792000000, 1719795600000)
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000)
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-1', 1719792000000, 1719795600000)
        ]),
      ]
    )
  ]
  
  const availabilities = await usecase.call('event-1')

  expect(availabilities[0].members.length).toEqual(3)
  expect(availabilities[0].startDate).toEqual(1719792000000)
  expect(availabilities[0].endDate).toEqual(1719795600000)
})

test('Test get best availabilities usecase success 2 availabilities not continuous', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)
  
  AvailabilityRepositoryMock.events = [
    new Event(
      'event-2',
      'Reunião com 2 Availabilities Diferentes',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('member-1', 'Membro 1', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719800000000, 1719803600000),
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719800000000, 1719803600000),
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719800000000, 1719803600000),
        ]),
      ]
    )
  ]
  
  const availabilities = await usecase.call('event-2')

  expect(availabilities.length).toEqual(2)
  expect(availabilities[0].members.length).toEqual(3)
  expect(availabilities[0].startDate).toEqual(1719792000000)
  expect(availabilities[0].endDate).toEqual(1719795600000)
  expect(availabilities[1].startDate).toEqual(1719800000000)
  expect(availabilities[1].endDate).toEqual(1719803600000)
})

test('Test get best availabilities usecase success 4 equal availabilities not continuous for all members', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)
  
  AvailabilityRepositoryMock.events = [
    new Event(
      'event-3',
      'Reunião com 4 Availabilities Diferentes',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('member-1', 'Membro 1', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719800000000, 1719803600000),
          new Availability('availability-3', 1719807200000, 1719810800000),
          new Availability('availability-4', 1719814400000, 1719818000000),
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719800000000, 1719803600000),
          new Availability('availability-3', 1719807200000, 1719810800000),
          new Availability('availability-4', 1719814400000, 1719818000000),
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719800000000, 1719803600000),
          new Availability('availability-3', 1719807200000, 1719810800000),
          new Availability('availability-4', 1719814400000, 1719818000000),
        ]),
      ]
    )
  ]
  
  
  const availabilities = await usecase.call('event-3')

  expect(availabilities.length).toEqual(4)
  expect(availabilities[0].members.length).toEqual(3)
  expect(availabilities[0].startDate).toEqual(1719792000000)
  expect(availabilities[1].members.length).toEqual(3)
  expect(availabilities[1].startDate).toEqual(1719800000000)
  expect(availabilities[2].members.length).toEqual(3)
  expect(availabilities[2].startDate).toEqual(1719807200000)
  expect(availabilities[3].members.length).toEqual(3)
  expect(availabilities[3].startDate).toEqual(1719814400000)
})

test('Test get best availabilities usecase success 2 equal availabilities continuous for all members', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)
  
  AvailabilityRepositoryMock.events = [
    new Event(
      'event-4',
      'Reunião com Availabilities Sequenciais',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('member-1', 'Membro 1', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000),
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000),
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000),
        ]),
      ]
    )
  ]
  
  
  
  const availabilities = await usecase.call('event-4')

  expect(availabilities.length).toEqual(1)
  expect(availabilities[0].members.length).toEqual(3)
  expect(availabilities[0].startDate).toEqual(1719792000000)
  expect(availabilities[0].endDate).toEqual(1719799200000)
})

test('Test get best availabilities usecase success 3 equal availabilities all continuous for all members', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)
  
  AvailabilityRepositoryMock.events = [
    new Event(
      'event-5',
      'Reunião com Availabilities em Sequência',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('member-1', 'Membro 1', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000),
          new Availability('availability-3', 1719799200000, 1719802800000),
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000),
          new Availability('availability-3', 1719799200000, 1719802800000),
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000),
          new Availability('availability-3', 1719799200000, 1719802800000),
        ]),
      ]
    )
  ]
  
  
  
  
  const availabilities = await usecase.call('event-5')

  expect(availabilities.length).toEqual(1)
  expect(availabilities[0].members.length).toEqual(3)
  expect(availabilities[0].startDate).toEqual(1719792000000)
  expect(availabilities[0].endDate).toEqual(1719802800000)
})

test('Test get best availabilities usecase success 4 equal availabilities, 2 by 2 continuous, for all members', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)
  
  AvailabilityRepositoryMock.events = [
    new Event(
      'event-6',
      'Reunião com Availabilities Sequenciais e Espaçadas',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('member-1', 'Membro 1', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000),
          new Availability('availability-3', 1719807200000, 1719810800000),
          new Availability('availability-4', 1719810800000, 1719814400000),
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000),
          new Availability('availability-3', 1719807200000, 1719810800000),
          new Availability('availability-4', 1719810800000, 1719814400000),
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000),
          new Availability('availability-3', 1719807200000, 1719810800000),
          new Availability('availability-4', 1719810800000, 1719814400000),
        ]),
      ]
    )
  ]
  
  const availabilities = await usecase.call('event-6')

  expect(availabilities.length).toEqual(2)
  expect(availabilities[0].members.length).toEqual(3)
  expect(availabilities[0].startDate).toEqual(1719792000000)
  expect(availabilities[0].endDate).toEqual(1719799200000)
  expect(availabilities[1].members.length).toEqual(3)
  expect(availabilities[1].startDate).toEqual(1719807200000)
  expect(availabilities[1].endDate).toEqual(1719814400000)
})

test('Test get best availabilities success 3 members, but 1 equal availability for only 2 members', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)
  
  AvailabilityRepositoryMock.events = [
    new Event(
      'event-7',
      'Reunião com 2 Membros com Availability em Comum',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('member-1', 'Membro 1', [
          new Availability('availability-1', 1719792000000, 1719795600000),
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000),
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-2', 1719800000000, 1719803600000),
        ]),
      ]
    )
  ]
  
  
  const availabilities = await usecase.call('event-7')

  expect(availabilities.length).toEqual(1)
  expect(availabilities[0].members.length).toEqual(2)
  expect(availabilities[0].startDate).toEqual(1719792000000)
  expect(availabilities[0].endDate).toEqual(1719795600000)
})

test('Test update availabilities usecase fail', async () => {
  const repo = new AvailabilityRepositoryMock()
  repo.resetMock()

  expect(1).toEqual(1)
})
