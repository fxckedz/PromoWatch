import {prisma} from "../database/prisma.js"
import {Platform} from "../../generated/prisma/client.js"

export class PlatformCredentialsRepository {

  async findByPlatform(platform: Platform){
    return await prisma.platformCredential.findUnique({
      where: {platform}
    })
  }

  async upsertCredentials(platform: Platform, data: {
    accessToken?: string
    refreshToken?: string
    expiresAt?: Date
    apiKey?: string
    apiSecret?: string
    associateTag?: string
  }) {
    return prisma.platformCredential.upsert({
      where: {platform},
      update: {
        ...data,
        updatedAt: new Date(),
      },
      create: {
        platform,
        ...data
      }
    })
  }

  async updateTokens(platform: Platform, accessToken: string, refreshToken: string, expiresAt: Date){
    return prisma.platformCredential.update({
      where: {platform},
      data: {
        accessToken,
        refreshToken,
        expiresAt
      }
    })
  }

}
