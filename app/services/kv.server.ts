import { Redis } from 'ioredis'

import { vars } from './vars.server'

const ONE_DAY = 86400

let redisClient: Redis
declare global {
  var __rc: Redis
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === 'production') {
  redisClient = new Redis(vars.REDIS_HOSTNAME)
} else {
  if (!global.__rc) {
    global.__rc = new Redis(vars.REDIS_HOSTNAME)
  }
  redisClient = global.__rc
}

async function getKV<T>(key: string): Promise<T | null> {
  if (vars.CACHE_ENABLED !== 'true') {
    return null
  }

  try {
    const value = await redisClient.get(key)

    if (!value) {
      return null
    }

    return JSON.parse(value) as T
  } catch (error) {
    console.error(error)
    return null
  }
}

async function saveKV<T>(key: string, value: T, expireInSeconds: number = ONE_DAY) {
  if (vars.CACHE_ENABLED !== 'true') {
    return
  }

  try {
    await redisClient.setex(key, expireInSeconds, JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

export { redisClient, getKV, saveKV }
