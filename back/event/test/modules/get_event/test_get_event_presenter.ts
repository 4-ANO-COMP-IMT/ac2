import { GetEventPresenter } from "../../../src/modules/get_event/get_event_presenter"

interface TestGetEventPresenterProps {
    testEvent: () => void,
}

class TestGetEventPresenter implements TestGetEventPresenterProps {
    constructor() {
        console.log("====== testEvent ======")
        this.testEvent()
    }
    
    testEvent() {
        const presenter = new GetEventPresenter()
        const response = presenter.call({params: {id: '2'}})
        console.log("status: ", response.status === 200)
        console.log("message: ", response.message === "event found")
    }
}

new TestGetEventPresenter()