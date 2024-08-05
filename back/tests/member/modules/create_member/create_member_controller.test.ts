import { describe, expect, it, test } from 'vitest'
import { CreateMemberController } from '../../../../src/member/modules/create_member/create_member_controller'
import { CreateMemberUsecase } from '../../../../src/member/modules/create_member/create_member_usecase'
import { CreateMemberRequest } from '../../../../src/member/modules/create_member/protocols'
import { MemberRepositoryMock } from '../../../../src/member/shared/infra/repos/member_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'

test('create member controller created', async () => {
  const repo = new MemberRepositoryMock()
  const usecase = new CreateMemberUsecase(repo)
  const controller = new CreateMemberController(usecase)
  const request = new HttpRequest('create', {
    eventId: '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
    name: 'Sollerzinho',
    password: 'Teste123!'
  })
  const response = await controller.call(request)

  expect(response.status).toBe(HTTP_STATUS_CODE.CREATED)
  expect(response.message).toBe('member created')
  repo.resetMock()
})

test('create event controller created without password', async () => {
  const repo = new MemberRepositoryMock()
  const usecase = new CreateMemberUsecase(repo)
  const controller = new CreateMemberController(usecase)
  const request = new HttpRequest('create', {
    eventId: '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
    name: 'Soller'
  })
  const response = await controller.call(request)

  expect(response.status).toBe(HTTP_STATUS_CODE.CREATED)
  expect(response.message).toBe('member created')
  repo.resetMock()
})

describe('create event controller body', () => {
  it('should return BAD REQUEST if body is missing', async () => {
    const repo = new MemberRepositoryMock()
    const usecase = new CreateMemberUsecase(repo)
    const controller = new CreateMemberController(usecase)
    const request = new HttpRequest('create', {} as CreateMemberRequest)
    const response = await controller.call(request)
    expect(response.message).toBe('missing body')
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.data).toBe(undefined)
    repo.resetMock()
  })

  it('should return BAD REQUEST if name is missing', async () => {
    const repo = new MemberRepositoryMock()
    const usecase = new CreateMemberUsecase(repo)
    const controller = new CreateMemberController(usecase)
    const request = new HttpRequest('create', {
      eventId: '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
      password: 'Teste123!'
    } as CreateMemberRequest)
    const response = await controller.call(request)
    expect(response.message).toBe('missing name')
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.data).toBe(undefined)
    repo.resetMock()
  })

  it('should return BAD REQUEST if idEvent is missing', async () => {
    const repo = new MemberRepositoryMock()
    const usecase = new CreateMemberUsecase(repo)
    const controller = new CreateMemberController(usecase)
    const request = new HttpRequest('create', {
      name: 'Soller',
      password: 'Teste123!'
    } as CreateMemberRequest)
    const response = await controller.call(request)
    expect(response.message).toBe('missing eventId')
    expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    expect(response.data).toBe(undefined)
    repo.resetMock()
  })
})

test('create member controller name already exists', async () => {
  const repo = new MemberRepositoryMock()
  const usecase = new CreateMemberUsecase(repo)
  const controller = new CreateMemberController(usecase)
  const request = new HttpRequest('create', {
    eventId: '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
    name: 'Adam Levine',
    password: 'Teste123!'
  })
  const response = await controller.call(request)

  expect(response.status).toBe(HTTP_STATUS_CODE.CONFLICT)
  expect(response.message).toBe('Member already exists with name: Adam Levine')
  repo.resetMock()
})

test('create member controller event not found', async () => {
  const repo = new MemberRepositoryMock()
  const usecase = new CreateMemberUsecase(repo)
  const controller = new CreateMemberController(usecase)
  const request = new HttpRequest('create', {
    eventId: '9b2f4e8c-8d59-11eb-8dcd-0242ac130004',
    name: 'Soller',
    password: 'Teste123!'
  })
  const response = await controller.call(request)

  expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
  expect(response.message).toBe(
    'Event not found for eventId: 9b2f4e8c-8d59-11eb-8dcd-0242ac130004'
  )
  repo.resetMock()
})
