import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import { env } from "../config/config.js"

const client = createClient({ url: env.DATABASE_URL })
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const db = drizzle({ client })
