import { MongoClient } from 'mongodb'
import { v4 as uuid } from 'uuid'

import { Event } from '../../../../shared/domain/entities/event'
import { environments } from '../../../../shared/env/environments'
import { EventRepositoryInterface } from './event_repository_interface'

export class EventRepositoryMongo implements EventRepositoryInterface {
  mongoDBUser: string = environments.mongoDBUser
  mongoDBPassword: string = environments.mongoDBPassword
  mongoDBCluster: string = environments.mongoDBCluster
  mongoDBAppName: string = environments.mongoDBAppName
  urlConnect: string = `mongodb+srv://${this.mongoDBUser}:${this.mongoDBPassword}@${this.mongoDBCluster}/?retryWrites=true&w=majority&appName=${this.mongoDBAppName}`
  eventCollection: string = environments.mongoDBEventName
  collection: any

  constructor() {
    console.log('urlConnect:', this.urlConnect)
    const client = new MongoClient(this.urlConnect)
    client.connect().then(() => {
      console.log('Connected to MongoDB')
    })
    const db = client.db(this.eventCollection)
    this.collection = db.collection(this.eventCollection)
  }

  async createEvent(
    name: string,
    dates: number[],
    notEarlier: number,
    notLater: number,
    description?: string | undefined
  ): Promise<Event> {
    try {
      const id = uuid()
      await this.collection.insertOne({
        id,
        name,
        dates,
        notEarlier,
        notLater,
        description
      })
      return new Event(
        uuid(),
        name,
        dates,
        notEarlier,
        notLater,
        [],
        description
      )
    } catch (error) {
      throw new Error('Error creating event')
    }
  }

  getEvent(eventId: string): Promise<Event> {
    throw new Error('Method not implemented.')
  }
  createMember(
    eventId: string,
    memberId: string,
    name: string,
    password?: string | undefined
  ): Promise<Event> {
    throw new Error('Method not implemented.')
  }
}
