import { expect, test } from 'vitest'

import { CreateMemberPresenter } from '../../../../src/member/modules/create_member/create_member_presenter'
import { CreateMemberRequest } from '../../../../src/member/modules/create_member/protocols'
import { MemberRepositoryMock } from '../../../../src/member/shared/infra/repos/member_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'

test('create member presenter created', async () => {
  const repo = new MemberRepositoryMock()
  const presenter = new CreateMemberPresenter()
  const request = new HttpRequest('create', {
    eventId: '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
    name: 'Sollerzinho',
    password: 'Teste123!'
  })
  const response = await presenter.call(request)

  expect(response.status).toBe(HTTP_STATUS_CODE.CREATED)
  expect(response.message).toBe('member created')
  repo.resetMock()
})

test('create member presenter should return BAD REQUEST if body is missing', async () => {
  const repo = new MemberRepositoryMock()
  const presenter = new CreateMemberPresenter()
  const request = new HttpRequest('post', {} as CreateMemberRequest)
  const response = await presenter.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
  expect(response.message).toBe('missing body')
  expect(response.data).toBe(undefined)
  repo.resetMock()
})

test('create member presenter should return CONFLICT if member already exists', async () => {
  const repo = new MemberRepositoryMock()
  const presenter = new CreateMemberPresenter()
  const request = new HttpRequest('post', {
    eventId: '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
    name: 'Adam Levine',
    password: 'Teste123!'
  } as CreateMemberRequest)
  const response = await presenter.call(request)
  expect(response.message).toBe('Member already exists with name: Adam Levine')
  expect(response.status).toBe(HTTP_STATUS_CODE.CONFLICT)
  repo.resetMock()
})

test('create member presenter should return NOT FOUND if eventId doesnt exists', async () => {
  const repo = new MemberRepositoryMock()
  const presenter = new CreateMemberPresenter()
  const request = new HttpRequest('post', {
    eventId: '9b2f123',
    name: 'Soller',
    password: 'Teste123!'
  } as CreateMemberRequest)
  const response = await presenter.call(request)
  expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND)
  expect(response.message).toBe('Event not found for eventId: 9b2f123')
  repo.resetMock()
})
