import { config } from 'dotenv'

config()

type Environments = {
  stage: string
  eventPort: string | number
  dynamoPort: string | number
}

export const environments: Environments = {
  stage: process.env.STAGE || 'test',
  eventPort: process.env.EVENT_PORT || 3000,
  dynamoPort: process.env.DYNAMO_PORT || 8000
}
