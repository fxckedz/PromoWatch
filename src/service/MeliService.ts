import axios from "axios"
import { env } from "../config/Env.js"
import { PlatformCredentialsRepository } from "../repository/PlatformCredentialsRepository.js"
import { IPlataformCredential } from "../dto/IPlatformCredential.js"

export class MeliService{
  constructor(
    private readonly repository: PlatformCredentialsRepository,
    private readonly baseUrl: string = "https://api.mercadolibre.com"
  ) {}

  async initializeCredentials(code: string) {
    const data = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: env.ML_ID!,
      client_secret: env.ML_SECRET!,
      code: code,
      redirect_uri: env.ML_URI!,
    })

    try {
      const response = await axios.post(`${this.baseUrl}/oauth/token`, data, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })

      const { access_token, refresh_token, expires_in } = response.data

      // AJUSTE ESSENCIAL: Transforma os segundos em uma data real
      const expiresAtDate = new Date(Date.now() + expires_in * 1000)

      const platformCredential: IPlataformCredential = {
        platform: "MERCADO_LIVRE",
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expiresAtDate
      }

      return this.repository.upsertCredentials(platformCredential)

    } catch (error) {
      console.error("Erro na API do Meli:", error)
      throw new Error("Falha ao inicializar credenciais: verifique o 'code' ou o 'redirect_uri'",{cause: error})
    }
  }

  async getValidToken(): Promise<string>{
    const creds = await this.repository.findByPlatform("MERCADO_LIVRE")

    if(!creds || !creds.refreshToken){
      throw new Error("Configurações do Mercado Livre não encontradas.")
    }

    const isExpired = creds.expiresAt
      ? new Date(Date.now() + 5 * 60 * 1000) > creds.expiresAt
      : true

    if(isExpired){
      return this.refreshTokens(creds.refreshToken)
    }

    return creds.accessToken!
  }

  private async refreshTokens(refreshToken: string): Promise<string>{
    try {
      const params = new URLSearchParams({
        grant_type: "refresh_token",
        client_id: env.ML_ID,
        client_secret: env.ML_SECRET,
        refresh_token: refreshToken,
      })

      const response = await axios.post(`${this.baseUrl}/oauth/token`, params)

      const {access_token, refresh_token, expires_in} = response.data

      const expiresAt = new Date(Date.now() + expires_in * 1000)

      await this.repository.updateTokens("MERCADO_LIVRE", access_token, refresh_token, expiresAt)

      return access_token

    } catch (error) {
      console.error("Erro na renovação do token Meli:", error)
      throw new Error("Falha crítica na autenticação OAuth.",{cause: error})
    }
  }
}
