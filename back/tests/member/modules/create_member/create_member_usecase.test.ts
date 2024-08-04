import { expect, test } from 'vitest'

import { CreateMemberUsecase } from '../../../../src/member/modules/create_member/create_member_usecase'
import { MemberRepositoryMock } from '../../../../src/member/shared/infra/repos/member_repository_mock'
import { Member } from '../../../../src/shared/domain/entities/member'

test('create member usecase success', async () => {
  const repo = new MemberRepositoryMock()
  const usecase = new CreateMemberUsecase(repo)
  const member = await usecase.call(
    '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
    'Adam Leviners',
    'Brownas123!'
  )

  expect(member).toBeInstanceOf(Member)
  expect(member.name).toBe('Adam Leviners')
  expect(member.password).toStrictEqual('Brownas123!')
  repo.resetMock()
})

test('create member usecase event not found', async () => {
  const repo = new MemberRepositoryMock()
  const usecase = new CreateMemberUsecase(repo)
  try {
    await usecase.call(
      '9b2f4e8c-8d59-11eb-8dcd-0242ac130004',
      'Adam Leviners',
      'Brownas123!'
    )
  } catch (err: any) {
    expect(err.message).toBe(
      'Event not found for eventId: 9b2f4e8c-8d59-11eb-8dcd-0242ac130004'
    )
  }
  repo.resetMock()
})

test('create member usecase member duplicated', async () => {
  const repo = new MemberRepositoryMock()
  const usecase = new CreateMemberUsecase(repo)
  try {
    await usecase.call(
      '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
      'Adam Levine',
      'Brownas123!'
    )
  } catch (err: any) {
    expect(err.message).toBe('Member already exists with name: Adam Levine')
  }
  repo.resetMock()
})
