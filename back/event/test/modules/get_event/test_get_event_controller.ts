import { GetEventController } from "../../../src/modules/get_event/get_event_controller"
import { GetEventUsecase } from "../../../src/modules/get_event/get_event_usecase"
import { EventRepositoryMock } from "../../../src/shared/domain/repos/event_repository_mock"

interface TestGetEventControllerProps {
    testWithoutId: () => void,
    testEventNotFound: () => void,
    testEvent: () => void,
}

class TestGetEventController implements TestGetEventControllerProps {
    constructor() {
        console.log("====== testWithoutId ======")
        this.testWithoutId()
        console.log("\n====== testEventNotFound ======")
        this.testEventNotFound()
        console.log("\n====== testEvent ======")
        this.testEvent()
        
    }
    
    testWithoutId() {
        const repo = new EventRepositoryMock()
        const usecase = new GetEventUsecase(repo)
        const controller = new GetEventController(usecase)
        const response = controller.call({params: {}})
        console.log("status: ", response.status === 400)
        console.log("message: ", response.message === "id is undefined")
        console.log("event: ", response.event === undefined)
    }
    
    testEventNotFound() {
        const repo = new EventRepositoryMock()
        const usecase = new GetEventUsecase(repo)
        const controller  = new GetEventController(usecase)
        const response = controller.call({params:{id:"4"}})
        console.log("status: ", response.status === 404)
        console.log("message: ", response.message === "event not found" )
        console.log("event: ", response.event === undefined)
    }

    testEvent() {
        const repo = new EventRepositoryMock()
        const usecase = new GetEventUsecase(repo)
        const controller = new GetEventController(usecase)
        const response = controller.call({params: {id: '2'}})
        const event_expect = repo.getEvent('2')?.to_json()
        console.log("status: ", response.status === 200)
        console.log("message: ", response.message === "event found")
        console.log("events are equal: ", response.event?.id === event_expect?.id && response.event?.name === event_expect?.name && response.event?.startDate === event_expect?.startDate && response.event?.endDate === event_expect?.endDate && response.event?.timeInterval === event_expect?.timeInterval)
    }
}

new TestGetEventController()