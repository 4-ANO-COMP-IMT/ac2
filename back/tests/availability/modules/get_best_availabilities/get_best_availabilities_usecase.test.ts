import { expect, test } from 'vitest'

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
        ])
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
          new Availability('availability-2', 1719800000000, 1719803600000)
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719800000000, 1719803600000)
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719800000000, 1719803600000)
        ])
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
          new Availability('availability-4', 1719814400000, 1719818000000)
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719800000000, 1719803600000),
          new Availability('availability-3', 1719807200000, 1719810800000),
          new Availability('availability-4', 1719814400000, 1719818000000)
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719800000000, 1719803600000),
          new Availability('availability-3', 1719807200000, 1719810800000),
          new Availability('availability-4', 1719814400000, 1719818000000)
        ])
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
          new Availability('availability-2', 1719795600000, 1719799200000)
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000)
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000)
        ])
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
          new Availability('availability-3', 1719799200000, 1719802800000)
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000),
          new Availability('availability-3', 1719799200000, 1719802800000)
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000),
          new Availability('availability-3', 1719799200000, 1719802800000)
        ])
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
          new Availability('availability-4', 1719810800000, 1719814400000)
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000),
          new Availability('availability-3', 1719807200000, 1719810800000),
          new Availability('availability-4', 1719810800000, 1719814400000)
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719795600000, 1719799200000),
          new Availability('availability-3', 1719807200000, 1719810800000),
          new Availability('availability-4', 1719810800000, 1719814400000)
        ])
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
          new Availability('availability-1', 1719792000000, 1719795600000)
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000)
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-2', 1719800000000, 1719803600000)
        ])
      ]
    )
  ]

  const availabilities = await usecase.call('event-7')

  expect(availabilities.length).toEqual(1)
  expect(availabilities[0].members.length).toEqual(2)
  expect(availabilities[0].startDate).toEqual(1719792000000)
  expect(availabilities[0].endDate).toEqual(1719795600000)
})

test('Test get best availabilities success 3 members, 2 common availabilities with different members', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)

  AvailabilityRepositoryMock.events = [
    new Event(
      'event-8',
      'Reunião com Membros que Compartilham Availabilities Diferentes',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('member-1', 'Membro 1', [
          new Availability('availability-1', 1719792000000, 1719795600000)
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719800000000, 1719803600000)
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-2', 1719800000000, 1719803600000)
        ])
      ]
    )
  ]

  const availabilities = await usecase.call('event-8')

  expect(availabilities.length).toEqual(2)
  expect(availabilities[0].members.length).toEqual(2)
  expect(availabilities[0].startDate).toEqual(1719792000000)
  expect(availabilities[0].endDate).toEqual(1719795600000)
  expect(availabilities[1].members.length).toEqual(2)
  expect(availabilities[1].startDate).toEqual(1719800000000)
  expect(availabilities[1].endDate).toEqual(1719803600000)
})

test('Test get best availabilities failure not found n-1 members with the same availability', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)

  AvailabilityRepositoryMock.events = [
    new Event(
      'event-9',
      'Reunião com Membros com Availabilities Distintas',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('member-1', 'Membro 1', [
          new Availability('availability-1', 1719792000000, 1719795600000)
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-2', 1719800000000, 1719803600000)
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-3', 1719807200000, 1719810800000)
        ])
      ]
    )
  ]
  expect(async () => await usecase.call('event-9')).rejects.toThrowError(
    'No best availability found'
  )
})

test('Test get best availabilities success 4 availability as n-1 members', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)

  AvailabilityRepositoryMock.events = [
    new Event(
      'event-10',
      'Reunião com 2 Membros com Availabilities Diferentes',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('member-1', 'Membro 1', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719800000000, 1719803600000)
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-3', 1719807200000, 1719810800000),
          new Availability('availability-4', 1719814400000, 1719818000000)
        ])
      ]
    )
  ]

  const availabilities = await usecase.call('event-10')

  expect(availabilities.length).toEqual(4)
  expect(availabilities[0].members.length).toEqual(1)
  expect(availabilities[0].startDate).toEqual(1719792000000)
  expect(availabilities[0].endDate).toEqual(1719795600000)
  expect(availabilities[1].members.length).toEqual(1)
  expect(availabilities[1].startDate).toEqual(1719800000000)
  expect(availabilities[1].endDate).toEqual(1719803600000)
  expect(availabilities[2].members.length).toEqual(1)
  expect(availabilities[2].startDate).toEqual(1719807200000)
  expect(availabilities[2].endDate).toEqual(1719810800000)
  expect(availabilities[3].members.length).toEqual(1)
  expect(availabilities[3].startDate).toEqual(1719814400000)
  expect(availabilities[3].endDate).toEqual(1719818000000)
})

test('Test get best availabilities failure availability common for 3 members but in total 5 members', async () => {
  const repo = new AvailabilityRepositoryMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)

  AvailabilityRepositoryMock.events = [
    new Event(
      'event-11',
      'Reunião com 5 Membros e Availabilities em Comum',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('member-1', 'Membro 1', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-2', 1719800000000, 1719803600000)
        ]),
        new Member('member-2', 'Membro 2', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-3', 1719807200000, 1719810800000)
        ]),
        new Member('member-3', 'Membro 3', [
          new Availability('availability-1', 1719792000000, 1719795600000),
          new Availability('availability-4', 1719814400000, 1719818000000)
        ]),
        new Member('member-4', 'Membro 4', [
          new Availability('availability-5', 1719820000000, 1719823600000),
          new Availability('availability-6', 1719827200000, 1719830800000)
        ]),
        new Member('member-5', 'Membro 5', [
          new Availability('availability-7', 1719834400000, 1719838000000),
          new Availability('availability-8', 1719841600000, 1719845200000)
        ])
      ]
    )
  ]

  expect(async () => await usecase.call('event-11')).rejects.toThrowError(
    'No best availability found'
  )
})

test('Test get best availabilities failure event without members', async () => {
  const repo = new AvailabilityRepositoryMock()
  // reset old tests
  repo.resetMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)


  expect(async () => await usecase.call('550e8400-e29b-41d4-a716-446655440000')).rejects.toThrowError(
    'No best availability found'
  )
})

test('Test get best availabilities failure member without availability', async () => {
  const repo = new AvailabilityRepositoryMock()
  // reset old tests
  repo.resetMock()
  const usecase = new GetBestAvailabilitiesUsecase(repo)


  expect(async () => await usecase.call('123e4567-e89b-12d3-a456-426614174000')).rejects.toThrowError(
    'No best availability found'
  )
})

test('Test get best availabilities success real test 1', async () => {
  const repo = new AvailabilityRepositoryMock()
  repo.resetMock()
  AvailabilityRepositoryMock.events = [
    new Event(
      'event-uuid',
      'Reunião com 2 Availabilities Diferentes',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('f334a276-6c97-4efe-bb90-614c6baaa746', 'enzo.sakamoto', [
          new Availability('74ba969e-0e26-471d-9c28-810adb5866cc', 1728900000000, 1728925200000),
          new Availability('01f46009-1fb7-4751-a2f8-9d8b8e7cd5c3', 1728982800000, 1728986400000),
          new Availability('16ec0d19-843f-4b02-81f4-0d0458f6b07f', 1729072800000, 1729098000000),
          new Availability('8e0a9f63-b213-4407-a05d-c0916d9553c0', 1729252800000, 1729263600000)
        ]),
        new Member('433d956b-49ed-4b25-8d64-e1413dcf648f', 'pedro.soller', [
          new Availability('79b82c7d-b3c3-4674-9fd9-8fc3b1237ff9', 1728903600000, 1728921600000),
          new Availability('588ba241-31fa-47b4-af93-baaa3f57f032', 1729087200000, 1729090800000)
        ]),
        new Member('101c9ce9-204a-4e33-b4a4-480aae7e496b', 'asdasd', [
          new Availability('c151ffaf-6e16-4e58-9525-a375ed414799', 1728909000000, 1728914400000)
        ]),
        new Member('684e817e-0af4-474e-97f6-3b73da9ff6c1', 'pedro.solleraaa', [
          new Availability('9a6a61ec-adbc-4e11-af3a-30a4dc5ba98e', 1728910800000, 1728914400000)
        ]),
        new Member('a4d28dc6-cb66-457d-9fb7-e44b6490101c', 'enzo.sak@hotmail.com', [
          new Availability('fb68a964-1fd0-4abf-93b0-0c2a5d50b79c', 1728910800000, 1728912600000)
        ]),
        new Member('2262cb7d-315f-4329-9925-b061aa76ae17', 'pedro.soller.guirao.soller.kaoksdokasok', [
          new Availability('3c6fa255-8c7d-4165-8a29-5688d3e81caf', 1728909000000, 1728914400000)
        ])
      ]
      
    )
  ]
  const usecase = new GetBestAvailabilitiesUsecase(repo)
  const availabilities = await usecase.call('event-uuid')

  expect(availabilities.length).toEqual(1)
  repo.resetMock()

})

test('Test get best availabilities success real test 2', async () => {
  const repo = new AvailabilityRepositoryMock()
  AvailabilityRepositoryMock.events = [
    new Event(
      'event-uuid',
      'Reunião com 2 Availabilities Diferentes',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('54232728-7807-4cbf-beb4-8649793a000d', 'soller', [
          new Availability('fd3c810e-6ab7-46a0-8c82-7c000b933e5f', 1725271200000, 1725287400000),
          new Availability('66237ac6-d616-4abe-a8ec-1b2b0029b734', 1725357600000, 1725363000000),
          new Availability('e4add63b-8e68-4136-8019-8fb976aecc4e', 1725368400000, 1725377400000),
          new Availability('b4390885-6dba-4f8e-b42b-4424896a921b', 1725447600000, 1725460200000)
        ])
      ]
    )
  ]
  const usecase = new GetBestAvailabilitiesUsecase(repo)
  const availabilities = await usecase.call('event-uuid')

  expect(availabilities.length).toEqual(4)
  repo.resetMock()

})

test('Test get best availabilities success real test 3', async () => {
  const repo = new AvailabilityRepositoryMock()
  repo.resetMock()
  AvailabilityRepositoryMock.events = [
    new Event(
      'event-uuid',
      'Reunião com 2 Availabilities Diferentes',
      [1719781200000],
      32400000,
      75600000,
      [
        new Member('54232728-7807-4cbf-beb4-8649793a000d', 'soller', [
          new Availability('fd3c810e-6ab7-46a0-8c82-7c000b933e5f', 1725271200000, 1725287400000),
          new Availability('66237ac6-d616-4abe-a8ec-1b2b0029b734', 1725357600000, 1725363000000),
          new Availability('e4add63b-8e68-4136-8019-8fb976aecc4e', 1725368400000, 1725377400000),
          new Availability('b4390885-6dba-4f8e-b42b-4424896a921b', 1725447600000, 1725460200000)
        ]),
        new Member('e2db8aa6-bcd3-4530-a8a2-6413cf18e985', 'branco', [
          new Availability('e3ee7ca5-6f40-44bc-83f6-3bdfc6e91f01', 1725271200000, 1725280200000),
          new Availability('cde1dc08-2a0d-4c68-9222-494dab934b87', 1725282000000, 1725287400000),
          new Availability('e8345231-c809-4fa4-b684-ffb67adb4e95', 1725357600000, 1725363000000),
          new Availability('ee9a1939-3596-4d01-b605-d6d9341127c0', 1725368400000, 1725373800000),
          new Availability('d5d9bbc7-75cf-408b-81c5-f86538db0f05', 1725447600000, 1725451200000)
        ])
      ]
      
    )
  ]
  const usecase = new GetBestAvailabilitiesUsecase(repo)
  const availabilities = await usecase.call('event-uuid')

  expect(availabilities.length).toEqual(5)
  repo.resetMock()

})