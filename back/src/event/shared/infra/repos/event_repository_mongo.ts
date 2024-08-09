import { MongoClient } from 'mongodb'
import { v4 as uuid } from 'uuid'

import { Availability } from '../../../../shared/domain/entities/availability'
import { Event } from '../../../../shared/domain/entities/event'
import { Member } from '../../../../shared/domain/entities/member'
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
      return new Event(id, name, dates, notEarlier, notLater, [], description)
    } catch (error) {
      throw new Error('Error creating event')
    }
  }

  async getEvent(eventId: string): Promise<Event> {
    try {
      const event = await this.collection.findOne({ id: eventId })

      console.log('event:', event)

      return new Event(
        event.id,
        event.name,
        event.dates,
        event.notEarlier,
        event.notLater,
        event.members
          ? event.members.map(
              (member: {
                id: string
                name: string
                availabilities: any[]
                password: string | undefined
              }) =>
                new Member(
                  member.id,
                  member.name,
                  member.availabilities
                    ? member.availabilities.map(
                        (availability) =>
                          new Availability(
                            availability.id,
                            availability.startDate,
                            availability.endDate
                          )
                      )
                    : [],
                  member.password
                )
            )
          : [],
        event.description
      )
    } catch (error) {
      throw new Error('Event not found for eventId: ' + eventId)
    }
  }
  async createMember(
    eventId: string,
    memberId: string,
    name: string,
    password?: string | undefined
  ): Promise<Event> {
    try {
      await this.getEvent(eventId)
    } catch (error) {
      throw new Error('Event not found for eventId: ' + eventId)
    }

    const member = {
      id: memberId,
      name,
      password
    }

    try {
      await this.collection.updateOne(
        { id: eventId },
        { $push: { members: member } }
      )
    } catch (error) {
      throw new Error('Error creating member')
    }

    const event = await this.getEvent(eventId)

    return new Event(
      event.id,
      event.name,
      event.dates,
      event.notEarlier,
      event.notLater,
      event.members
        ? event.members.map(
            (member) =>
              new Member(
                member.id,
                member.name,
                member.availabilities
                  ? member.availabilities.map(
                      (availability) =>
                        new Availability(
                          availability.id,
                          availability.startDate,
                          availability.endDate
                        )
                    )
                  : [],
                member.password
              )
          )
        : [],
      event.description
    )
  }
}
