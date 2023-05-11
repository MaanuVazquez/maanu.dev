import Airtable from 'airtable'

import type { AirtableBase } from 'airtable/lib/airtable_base'

import { vars } from './vars.server'

let airtableClient: AirtableBase
declare global {
  var __ac: AirtableBase
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === 'production') {
  airtableClient = new Airtable({
    apiKey: vars.AIRTABLE_TOKEN
  }).base(vars.AIRTABLE_BASE)
} else {
  if (!global.__ac) {
    global.__ac = new Airtable({
      apiKey: process.env.AIRTABLE_TOKEN
    }).base(vars.AIRTABLE_BASE)
  }
  airtableClient = global.__ac
}

export { airtableClient }
