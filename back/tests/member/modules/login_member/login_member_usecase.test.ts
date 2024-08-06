import { expect, test, describe, it } from 'vitest'

import { LoginMemberUsecase } from '../../../../src/member/modules/login_member/login_member_usecase'
import { MemberRepositoryMock } from '../../../../src/member/shared/infra/repos/member_repository_mock'

describe('login member usecase success',  () => {
  it('with password', async () => {
    const repo = new MemberRepositoryMock()
    const usecase = new LoginMemberUsecase(repo)
    const validation = await usecase.call(
      '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
      'Adam Levine',
      'Brownas'
    )

    expect(validation).toBe(true)
    repo.resetMock()
  })
  it('without password', async () => {
    const repo = new MemberRepositoryMock()
    const usecase = new LoginMemberUsecase(repo)
    const validation = await usecase.call(
      '123e4567-e89b-12d3-a456-426614174000',
      'Adam Levine',
      'Brownas'
    )

    expect(validation).toBe(true)
    repo.resetMock()
  })
})

describe('login member usecase error',  () => {
  it('login member usecase event does not exist', async () => {
    const repo = new MemberRepositoryMock()
    const usecase = new LoginMemberUsecase(repo)
    try {
      await usecase.call(
        '9b2f4e8-8d59-11eb-8dcd-0242ac130004',
        'Adam Leviner',
        'Brownas123!'
      )
    } catch (err: any) {
      expect(err.message).toBe(
        'Event not found for eventId: 9b2f4e8-8d59-11eb-8dcd-0242ac130004'
      )
    }
    repo.resetMock()
  })

  it('login member usecase member does not exists', async () => {
    const repo = new MemberRepositoryMock()
    const usecase = new LoginMemberUsecase(repo)
    try {
      await usecase.call(
        '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
        'Adam Leviner',
        'Brownas123!'
      )
    } catch (err: any) {
      expect(err.message).toBe(
        'Member does not exists with name: Adam Leviner'
      )
    }
    repo.resetMock()
  })
})

test('login member usecase failure', async () => {
  const repo = new MemberRepositoryMock()
  const usecase = new LoginMemberUsecase(repo)
  const validation = await usecase.call(
      '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
      'Adam Levine',
      'Not Brownas'
    )
    expect(validation).toBe(false)
  repo.resetMock()
})