import { expect, test } from 'vitest'

import { LoginMemberPresenter } from '../../../../src/member/modules/login_member/login_member_presenter'
import { LoginMemberRequest } from '../../../../src/member/modules/login_member/protocols'
import { MemberRepositoryMock } from '../../../../src/member/shared/infra/repos/member_repository_mock'
import { HttpRequest } from '../../../../src/shared/domain/helpers/http/http_request'
import { HTTP_STATUS_CODE } from '../../../../src/shared/domain/helpers/http/http_status_code'
import { Event } from '../../../../src/shared/domain/entities/event'
import { Member } from '../../../../src/shared/domain/entities/member'
import { Availability } from '../../../../src/shared/domain/entities/availability'

test('login member presenter OK', async () => {
  const repo = new MemberRepositoryMock()
  const presenter = new LoginMemberPresenter()
  const request = new HttpRequest('post', {
    eventId: '9b2f4e8c-8d59-11eb-8dcd-0242ac130003',
    name: 'Adam Levine',
    password: 'Brownas'
  })
  const response = await presenter.call(request)

  expect(response.status).toBe(HTTP_STATUS_CODE.OK)
  expect(response.message).toBe('user logged in')
  repo.resetMock()
})

test('login member presenter BAD REQUEST if eventId is missing', async () => {
  const repo = new MemberRepositoryMock()
  const presenter = new LoginMemberPresenter()
  const request = new HttpRequest('post', {
    name: 'Adam Levine',
    password: 'Brownas'
  } as LoginMemberRequest)
  const response = await presenter.call(request)

  expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
  expect(response.message).toBe('missing eventId')
  repo.resetMock()
})

