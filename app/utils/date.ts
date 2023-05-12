import { formatInTimeZone } from 'date-fns-tz'

import { capitalizeWord } from './string'

export function getCurrentDayPeriod() {
  const currentPeriod = formatInTimeZone(new Date(), 'America/New_York', 'bbb')
  const lowerCase = currentPeriod.toLocaleLowerCase()

  if (lowerCase === 'pm' || lowerCase === 'am') {
    return ''
  }

  return capitalizeWord(currentPeriod)
}

export function formatMonthDayYear(date: string) {
  return formatInTimeZone(new Date(date), 'America/New_York', 'MM/dd/yyyy')
}

export function formatRichDate(date: string) {
  return formatInTimeZone(new Date(date), 'America/New_York', 'MMMM dd, yyyy')
}
