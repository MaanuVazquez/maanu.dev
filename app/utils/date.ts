import { formatInTimeZone } from 'date-fns-tz'

export function formatMonthDayYear(date: string) {
  return formatInTimeZone(new Date(date), 'America/New_York', 'MM/dd/yyyy')
}

export function formatRichDate(date: string) {
  return formatInTimeZone(new Date(date), 'America/New_York', 'MMMM dd, yyyy')
}

export function formatRFC822(date: string) {
  return formatInTimeZone(new Date(date), 'America/New_York', 'EEE, dd MMM yyyy HH:mm:ss xx')
}
