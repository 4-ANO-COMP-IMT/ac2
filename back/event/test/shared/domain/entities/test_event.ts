import { Event } from '../../../../src/shared/domain/entities/event'

interface TestEventProps {
    testConstructor: () => void,
    testCalculateTotalTime: () => void,
    testCalculateCellNumbers: () => void,
}

class TestEvent implements TestEventProps {
    constructor() {
        console.log("====== testConstructor ======")
        this.testConstructor()
        console.log("\n====== testCalculateTotalTime ======")
        this.testCalculateTotalTime()
        console.log("\n====== testCalculateCellNumbers ======")
        this.testCalculateCellNumbers()
    }
    
    testConstructor() {
        const event = new Event(
            '1',
            'Event Name',
            1632950400000,
            1632954000000,
            600000
        )
        
        console.log("Event ID: ", event.id === '1')
        console.log("Event Name: ", event.name === 'Event Name')
        console.log("Event Start Date: ", event.startDate === 1632950400000)
        console.log("Event End Date: ", event.endDate === 1632954000000)
        console.log("Event Cell Duration: ", event.timeInterval === 600000)
    }

    testCalculateTotalTime() {
        const event = new Event(
            '1',
            'Event Name',
            1632950400000,
            1632954000000,
            600000
        )
        console.log("Total Time: ", event.calculateTotalTime() === 3600000)
    }
    
    testCalculateCellNumbers() {
        const event = new Event(
            '1',
            'Event Name',
            1632950400000,
            1632954000000,
            600000
        )
         console.log("Total Time: ", event.calculateCellNumbers() === 6)
        
    }

}

new TestEvent()