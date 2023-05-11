import { z } from 'zod'

const varsSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.string().default('3000'),
  AIRTABLE_TOKEN: z.string(),
  AIRTABLE_BASE: z.string(),
  REDIS_HOSTNAME: z.string(),
  CACHE_ENABLED: z.string().default('false')
})

export type Vars = z.infer<typeof varsSchema>
export const vars = varsSchema.parse(process.env)
