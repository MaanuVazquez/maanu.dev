import { createContext, useContext } from 'react'

import type { ReactNode } from 'react'

type Props = { isBot: boolean; children: ReactNode }

const IsBotContext = createContext(false)

export function useIsBot() {
  return useContext(IsBotContext) ?? false
}

export function IsBotProvider({ isBot, children }: Props) {
  return <IsBotContext.Provider value={isBot}>{children}</IsBotContext.Provider>
}
