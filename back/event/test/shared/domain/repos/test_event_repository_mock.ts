import { Event } from '../../../../src/shared/domain/entities/event'
import { EventRepositoryMock } from '../../../../src/shared/domain/repos/event_repository_mock'

interface TestEventRepositoryMockProps {
    testGetEventFound: () => void,
    testGetEventNotFound: () => void,
    testPutEventFound: () => void,
    testPutEventNotFound: () => void,
    testCreate: () => void,
    testDeleteFound: () => void
    testDeleteNotFound: () => void
}

class TestEventRepositoryMock implements TestEventRepositoryMockProps {
    constructor() {
        console.log("====== testGetEventFound ======")
        this.testGetEventFound()
        console.log("\n====== testGetEventNotFound ======")
        this.testGetEventNotFound()
        console.log("\n====== testPutEventFound ======")
        this.testPutEventFound()
        console.log("\n====== testPutEventNotFound ======")
        this.testPutEventNotFound()
        console.log("\n====== testCreate ======")
        this.testCreate()
        console.log("\n====== testDeleteFound ======")
        this.testDeleteFound()
        console.log("\n====== testDeleteNotFound ======")
        this.testDeleteNotFound()
        

    }
    
    testGetEventFound() {
        const repo = new EventRepositoryMock()
        const event = repo.getEvent('2')
        const event_expect = new Event(
            '2',
            'Academy Chest Day',
            1632950200000,
            1632954000000,
            300000
        )
        console.log("getEvent method found one event: ", event !== undefined)
        console.log("getEvent method as expected: ", event?.equals(event_expect))
    }
    
    testGetEventNotFound() {
        const repo = new EventRepositoryMock()
        const event = repo.getEvent('1001')
        console.log("getEvent method not found: ", event === undefined)
    }

    testPutEventFound(){
        const repo = new EventRepositoryMock()
        const event = repo.putEvent(
            new Event(
                '3',
                'Studying Software Engineering',
                1632950000000,
                1632954000000,
                100000
            ) 
        )
        const event_expect = new Event(
            '3',
            'Studying Software Engineering',
            1632950000000,
            1632954000000,
            100000
        ) 
        console.log("putEvent method changed one event: ", event !== undefined)
        console.log("putEvent method as expected: ", event?.equals(event_expect))
    }

    testPutEventNotFound(){
        const repo = new EventRepositoryMock()
        const event = repo.putEvent(
            new Event(
                '1001',
                'Studying Software Engineering',
                1632950000000,
                1632954000000,
                100000
            ) 
        )
        console.log("putEvent method not found event: ", event === undefined)
        
    }

    testCreate() {
        const repo = new EventRepositoryMock()
        const event = repo.createEvent(
            new Event(
                '4',
                'Event Name',
                1632950400000,
                1632954000000,
                600000
            )
        )
        console.log("createEvent method: ", repo.events.length === 4)
    }

    testDeleteFound() {
        const repo = new EventRepositoryMock()
        const event = repo.deleteEvent('2')
        console.log("deleteEvent method found: ", event !== undefined)
        console.log("deleteEvent method: ", repo.events.length === 2)
    }

    testDeleteNotFound() {
        const repo = new EventRepositoryMock()
        const event = repo.deleteEvent('1001')
        console.log("deleteEvent method not found: ", event === undefined)
    }
}

new TestEventRepositoryMock()