import { oauthTokens } from "../db/schema.js"
import { db } from "../db/index.js"
import { eq } from "drizzle-orm"

export interface TokenExposedData {
  telegramId: number
  mercadoLivreId: number
  expiresIn: number
  expiresAt: number
  createdAt: Date
}

export async function saveTokensInDb(data: {
  telegramId: number
  mercadoLivreId: number
  accessToken: string
  refreshToken: string
  expiresIn: number
}): Promise<TokenExposedData>{
  
  const expiresAt = Date.now() + data.expiresIn * 1000

  await db.insert(oauthTokens).values({

    ...data,
    expiresAt,

  }).onConflictDoUpdate({
    target: oauthTokens.telegramId,
    set: {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      expiresAt,
    },
  })

  const token = await db.select()
    .from(oauthTokens)
    .where(eq(oauthTokens.telegramId, data.telegramId))
    .get()

  if(!token){
    throw new Error("Falha ao buscar token após Inserção")
  }

  return {
    telegramId: token.telegramId,
    mercadoLivreId: token.mercadoLivreId,
    expiresIn: token.expiresIn,
    expiresAt: token.expiresAt,
    createdAt: token.createdAt!,
  }

}