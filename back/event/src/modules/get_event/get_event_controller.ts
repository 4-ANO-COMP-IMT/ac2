import { GetEventUsecase } from "./get_event_usecase"

export interface GetEventControllerProps {
    usecase: GetEventUsecase
    call: (req: any) => any
  }
  
export class GetEventController implements GetEventControllerProps {
    constructor(public usecase: GetEventUsecase) {
      this.usecase = usecase
    }
  
    call(req: any) {
        const id = req.params.id
        if (id === undefined) {
            return {
                "status": 400,
                "message": "id is undefined",
                "event": undefined 
            }
        }
        const event = this.usecase.call(id)
        if (event === undefined) {
            return {
                "status": 404,
                "message": "event not found",
                "event": undefined 
            }
        }
        else {
            return {
                "status": 200,
                "message": "event found",
                "event": event.to_json()
            }
        }
    }
}

  