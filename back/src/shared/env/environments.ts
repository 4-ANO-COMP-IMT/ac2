import { config } from 'dotenv'

config()

type Environments = {
  stage: string
  eventPort: string | number
  memberPort: string | number
  dynamoPort: string | number
  eventBusPort: string | number
  mongoDBUser: string
  mongoDBPassword: string
  mongoDBCluster: string
  mongoDBAppName: string
  mongoDBEventName: string
  mongoDBMemberName: string
  mongoDBAvailabilityName: string
}

export const environments: Environments = {
  stage: process.env.STAGE || 'test',
  eventPort: process.env.EVENT_PORT || 3000,
  memberPort: process.env.MEMBER_PORT || 4000,
  dynamoPort: process.env.DYNAMO_PORT || 8000,
  eventBusPort: process.env.EVENT_BUS_PORT || 10000,
  mongoDBCluster: process.env.MONGO_DB_CLUSTER || 'ac2cluster',
  mongoDBUser: process.env.MONGO_DB_USER || 'ac2',
  mongoDBPassword: process.env.MONGO_DB_PASSWORD || 'ac2',
  mongoDBAppName: process.env.MONGO_DB_APP_NAME || 'AC2Cluster',
  mongoDBEventName: process.env.MONGO_DB_EVENT_NAME || 'events',
  mongoDBMemberName: process.env.MONGO_DB_MEMBER_NAME || 'members',
  mongoDBAvailabilityName:
    process.env.MONGO_DB_AVAILABILITY_NAME || 'availabilities'
}
