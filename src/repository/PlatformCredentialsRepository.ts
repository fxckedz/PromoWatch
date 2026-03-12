import {prisma} from "../database/prisma.js"
import {Platform} from "../../generated/prisma/client.js"
import { IPlataformCredential } from "../dto/IPlatformCredential.js"

export class PlatformCredentialsRepository {

  async findByPlatform(platform: Platform){
    return await prisma.platformCredential.findUnique({
      where: {platform}
    })
  }

  async upsertCredentials(payload: IPlataformCredential) {

    const {platform, ...data} = payload

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
