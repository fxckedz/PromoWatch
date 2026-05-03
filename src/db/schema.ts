import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const oauthTokens = sqliteTable("oauth_tokens", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  telegramId: integer("telegram_id").unique().notNull(),
  mercadoLivreId: integer("mercado_livre_id").unique().notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  expiresIn: integer("expires_in").notNull(),
  expiresAt: integer("expires_at").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$default(() => new Date()),
})