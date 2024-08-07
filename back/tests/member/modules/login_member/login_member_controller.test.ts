import { describe, expect, it, test } from 'vitest'
import { LoginMemberController } from '../../../../src/member/modules/login_member/login_member_controller'
import { LoginMemberUsecase } from '../../../../src/member/modules/login_member/login_member_usecase'
import { LoginMemberRequest } from '../../../../src/member/modules/login_member/protocols'
import { MemberRepositoryMock } from '../../../../src/member/shared/infra/repos/member_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'

test('login member controller ok', async () => {
  const repo = new MemberRepositoryMock()
  const usecase = new LoginMemberUsecase(repo)
  const controller = new LoginMemberController(usecase)
  const request = new HttpRequest('post', {
    eventId: '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
    name: 'Adam Levine',
    password: 'Brownas'
  })
  const response = await controller.call(request)

  expect(response.status).toBe(HTTP_STATUS_CODE.OK)
  expect(response.message).toBe('user logged in')
  repo.resetMock()
})

test('login member controller wrong pass', async () => {
  const repo = new MemberRepositoryMock()
  const usecase = new LoginMemberUsecase(repo)
  const controller = new LoginMemberController(usecase)
  const request = new HttpRequest('post', {
    eventId: '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
    name: 'Adam Levine',
    password: 'Brownas123!'
  })
  const response = await controller.call(request)

  expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED)
  expect(response.message).toBe('invalid credentials for user Adam Levine')
  repo.resetMock()
})

test('login member controller wrong pass', async () => {
  const repo = new MemberRepositoryMock()
  const usecase = new LoginMemberUsecase(repo)
  const controller = new LoginMemberController(usecase)
  const request = new HttpRequest('post', {
    eventId: '9b2f4e8-8d59-11eb-8dcd-0242ac130004',
    name: 'Adam Levine',
    password: 'Brownas'
  })
  const response = await controller.call(request)

  expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
  expect(response.message).toBe('Event not found for eventId: 9b2f4e8-8d59-11eb-8dcd-0242ac130004')
  repo.resetMock()
})

test('login member controller wrong pass', async () => {
  const repo = new MemberRepositoryMock()
  const usecase = new LoginMemberUsecase(repo)
  const controller = new LoginMemberController(usecase)
  const request = new HttpRequest('post', {
    eventId: '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
    name: 'Adam Leviner',
    password: 'Brownas'
  })
  const response = await controller.call(request)

  expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
  expect(response.message).toBe('Member does not exists with name: Adam Leviner')
  repo.resetMock()
})

describe('login member controller missing', async () => {
  it('body', async () => {
    const repo = new MemberRepositoryMock()
    const usecase = new LoginMemberUsecase(repo)
    const controller = new LoginMemberController(usecase)
    const request = new HttpRequest('post', {
    } as LoginMemberRequest)
    const response = await controller.call(request)

    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing body')
    repo.resetMock()
  })
  
  it('eventId', async () => {
    const repo = new MemberRepositoryMock()
    const usecase = new LoginMemberUsecase(repo)
    const controller = new LoginMemberController(usecase)
    const request = new HttpRequest('post', {
      name: 'Adam Levine',
      password: 'Brownas'
    } as LoginMemberRequest)
    const response = await controller.call(request)

    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing eventId')
    repo.resetMock()
  })

  it('body', async () => {
    const repo = new MemberRepositoryMock()
    const usecase = new LoginMemberUsecase(repo)
    const controller = new LoginMemberController(usecase)
    const request = new HttpRequest('post', {
      eventId: '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
      password: 'Brownas'
    } as LoginMemberRequest)
    const response = await controller.call(request)

    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.message).toBe('missing name')
    repo.resetMock()
  })
})
