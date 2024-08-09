import { MongoClient } from 'mongodb'
import { v4 as uuid } from 'uuid'

import { Event } from '../../../../shared/domain/entities/event'
import { Member } from '../../../../shared/domain/entities/member'
import { environments } from '../../../../shared/env/environments'
import { MemberRepositoryInterface } from './member_repository_interface'

export class MemberRepositoryMongo implements MemberRepositoryInterface {
  mongoDBUser: string = environments.mongoDBUser
  mongoDBPassword: string = environments.mongoDBPassword
  mongoDBCluster: string = environments.mongoDBCluster
  mongoDBAppName: string = environments.mongoDBAppName
  urlConnect: string = `mongodb+srv://${this.mongoDBUser}:${this.mongoDBPassword}@${this.mongoDBCluster}/?retryWrites=true&w=majority&appName=${this.mongoDBAppName}`
  memberCollection: string = environments.mongoDBMemberName
  collection: any

  constructor() {
    console.log('urlConnect:', this.urlConnect)
    const client = new MongoClient(this.urlConnect)
    client.connect().then(() => {
      console.log('Connected to MongoDB')
    })
    const db = client.db(this.memberCollection)
    this.collection = db.collection(this.memberCollection)
  }

  async createEvent(
    id: string,
    name: string,
    dates: number[],
    notEarlier: number,
    notLater: number,
    description?: string | undefined
  ): Promise<Event> {
    try {
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
      console.log(error)
      throw new Error('Error creating event')
    }
  }

  createMember(
    eventId: string,
    name: string,
    password?: string | undefined
  ): Promise<Member> {
    throw new Error('Method not implemented.')
  }
  getEvent(eventId: string): Promise<Event> {
    throw new Error('Method not implemented.')
  }
  getMemberByName(name: string, eventId: string): Promise<Member | null> {
    throw new Error('Method not implemented.')
  }
}
