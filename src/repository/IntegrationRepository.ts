import {prisma} from "../database/prisma.js"
import {Platform} from "../prisma/client.js"
import { IIntegation } from "../dto/IIntegration.js"

export class IntegrationRepository {

  async findByPlatform(platform: Platform){
    return await prisma.integration.findUnique({
      where: {platform}
    })
  }

  async upsertCredentials(payload: IIntegation) {

    const {platform, ...data} = payload

    return prisma.integration.upsert({
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
    return prisma.integration.update({
      where: {platform},
      data: {
        accessToken,
        refreshToken,
        expiresAt
      }
    })
  }

}
