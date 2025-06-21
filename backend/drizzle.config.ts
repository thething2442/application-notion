import {defineConfig} from 'drizzle-kit'
import 'dotenv/config'
export default defineConfig({
  dialect:"turso",
  dbCredentials:{
    url:process.env.DATABASE_URL!,
    authToken:process.env.DATABASE_TOKEN!
  },
  out:'drizzle',
  schema:'./drizzle/schema.ts'
})