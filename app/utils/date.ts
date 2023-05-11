import format from 'date-fns/format'

import { capitalizeWord } from './string'

export function getCurrentDayPeriod() {
  const currentPeriod = format(new Date(), 'bbb')
  const lowerCase = currentPeriod.toLocaleLowerCase()

  if (lowerCase === 'pm' || lowerCase === 'am') {
    return ''
  }

  return capitalizeWord(currentPeriod)
}

export function formatMonthDayYear(date: string) {
  return format(new Date(date), 'MM/dd/yyyy')
}

export function formatRichDate(date: string) {
  return format(new Date(date), 'MMMM dd, yyyy')
}
