import { describe, expect, it, test } from 'vitest'

import { MemberRepositoryMock } from '../../../../../src/member/shared/infra/repos/member_repository_mock'




describe('Test createMember', () => {

    it('create a member', () => {
        const repo = new MemberRepositoryMock()
        const lengthBefore = MemberRepositoryMock.events[2].members.length
        repo.createMember("9b2f4e8c-8d59-11eb-8dcd-0242ac130003", "Adam Leviner", "Brownas123!")
        const lengthAfter = MemberRepositoryMock.events[2].members.length
        expect(lengthAfter).toBe(lengthBefore + 1)
        expect(MemberRepositoryMock.events[2].members[lengthAfter - 1].name).toBe("Adam Leviner")
        expect(MemberRepositoryMock.events[2].members[lengthAfter - 1].password).toBe("Brownas123!")
        expect(MemberRepositoryMock.events[2].members[lengthAfter - 1].availabilities.length).toBe(0)

        repo.resetMock()
    })

    it('create a member without password', () => {
        const repo = new MemberRepositoryMock()
        const lengthBefore = MemberRepositoryMock.events[2].members.length
        repo.createMember("9b2f4e8c-8d59-11eb-8dcd-0242ac130003", "Flavio Brownas")
        const lengthAfter = MemberRepositoryMock.events[2].members.length
        expect(lengthAfter).toBe(lengthBefore + 1)
        expect(MemberRepositoryMock.events[2].members[lengthAfter - 1].name).toBe("Flavio Brownas")
        expect(MemberRepositoryMock.events[2].members[lengthAfter - 1].password).toBe(undefined)
        expect(MemberRepositoryMock.events[2].members[lengthAfter - 1].availabilities.length).toBe(0)

        repo.resetMock()
    })

    
})

// describe('Test createMember failure', () => {
    // it('eventId not found', () => {
    //     const repo = new MemberRepositoryMock()
    //     try{
    //         repo.createMember("123", "Flavio Brownas", "Brownas123!")
    //         expect(true).toBe(false)
    //     }
    //     catch{
    //         expect(true).toBe(true)
    //     }
    //     repo.resetMock()
    // })

    // it('duplicate member', () => {
    //     const repo = new MemberRepositoryMock()
    //     try{
    //         repo.createMember("9b2f4e8c-8d59-11eb-8dcd-0242ac130003", "Adam Levine")
    //         expect(true).toBe(false)
    //     }
    //     catch{
    //         expect(true).toBe(true)
    //     }
    //     repo.resetMock()
    // })
// })

describe ('Test getMemberByName', () => {
    it('get a member', async () => {
        const repo = new MemberRepositoryMock()
        const member = await repo.getMemberByName("Adam Levine", "9b2f4e8c-8d59-11eb-8dcd-0242ac130003")
        expect(member?.name).toBe("Adam Levine")
        expect(member?.password).toBe("Brownas")
        repo.resetMock()
    })

    // it('event not found', () => {
    //     const repo = new MemberRepositoryMock()
    //     try{
    //         repo.getMemberByName("Adam Levine", "123")
    //         expect(true).toBe(false)
    //     }
    //     catch{
    //         expect(true).toBe(true)
    //     }
    //     repo.resetMock()
    // })

    // it('member not found', () => {
    //     const repo = new MemberRepositoryMock()
    //     const member = repo.getMemberByName("Flavio Brownas", "9b2f4e8c-8d59-11eb-8dcd-0242ac130003")
    //     expect(member).toBe(null)    
    //     repo.resetMock()
    // })
})