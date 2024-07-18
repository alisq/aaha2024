import { createContext } from 'react'

export const GlobalContext = createContext({
  demands: {},
  members: {},
  actions: {},
  pages: {},
  events: {},
  press: {}
})