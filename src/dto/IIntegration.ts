import { Platform } from "../prisma/enums.js"

export interface IIntegation {
  platform: Platform
  accessToken?: string
  refreshToken?: string
  expiresAt?: Date
  apiKey?: string
  apiSecret?: string
  associateTag?: string
}
