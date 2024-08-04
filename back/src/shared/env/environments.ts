import { config } from 'dotenv'

config()

type Environments = {
  stage: string
  eventPort: string | number
  memberPort: string | number
  dynamoPort: string | number
  eventBusPort: string | number
}

export const environments: Environments = {
  stage: process.env.STAGE || 'test',
  eventPort: process.env.EVENT_PORT || 3000,
  memberPort: process.env.MEMBER_PORT || 4000,
  dynamoPort: process.env.DYNAMO_PORT || 8000,
  eventBusPort: process.env.EVENT_BUS_PORT || 10000
}
