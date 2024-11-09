// Pad a number to 2 digits
const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, '0')

const toISOStringWithTimezone = (date: Date) => {
  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds())
  )
}

export function timeStampToDate(timestamp: number): string {
  const date = new Date(timestamp)

  return toISOStringWithTimezone(date)
}

export function millisecondsToHours(milliseconds: number): number {
  return Math.floor(milliseconds / (3.6 * Math.pow(10, 6)))
}

export function hoursToMilliseconds(hours: number): number {
  return Math.floor(hours * 3.6 * Math.pow(10, 6))
}

export function dateToMilliseconds(date: string): number {
  const newDate = new Date(date)

  return newDate.getTime()
}
