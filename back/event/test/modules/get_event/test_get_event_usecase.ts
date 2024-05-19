import { GetEventUsecase } from "../../../src/modules/get_event/get_event_usecase"
import { EventRepositoryMock } from "../../../src/shared/domain/repos/event_repository_mock"

interface TestGetEventUsecaseProps {
    testFound: () => void,
    testNotFound: () => void,
    
    
}

class TestGetEventUsecase implements TestGetEventUsecaseProps {
    constructor() {
        console.log("====== testFound ======")
        this.testFound()
        console.log("\n====== testNotFound ======")
        this.testNotFound()
        
    }
    
    testFound() {
        const repo = new EventRepositoryMock()
        const usecase = new GetEventUsecase(repo)
        const event = usecase.call('2')
        console.log("getEvent method found one event: ", event !== undefined)
    }
    
    testNotFound() {
        const repo = new EventRepositoryMock()
        const usecase = new GetEventUsecase(repo)
        const event = usecase.call('1001')
        console.log("getEvent method not found: ", event === undefined)
    }
}

new TestGetEventUsecase()