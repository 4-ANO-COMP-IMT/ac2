export class NotFoundError extends Error {
  constructor(message: string) {
    super(message + ' not found')
    this.name = 'NotFoundError'
  }
}

export class EntityError extends Error {
  constructor(entity: string, message: string) {
    super('Error in entity ' + entity + ': ' + message)
    this.name = 'EntityError'
  }
}

export class NoBestAvailability extends Error {
  constructor() {
    super('No best availability found')
    this.name = 'NoBestAvailability'
  }
}
