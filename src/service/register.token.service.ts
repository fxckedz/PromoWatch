import { env } from "../config/config.js"
import { IRegisterTokenParams, IRegisterTokenResponse } from "./interfaces/token.interfaces.js"
import axios from "axios"
import qs from "qs"

export async function registerTokenService(tgCode:string) {
  
  const urlParams: IRegisterTokenParams = {
    grant_type: "authorization_code",
    client_id: env.ML_ID,
    client_secret: env.ML_SECRET!,
    code: tgCode,
    redirect_uri: env.ML_URI!,
  }

  try {

    const response = await axios.post(
      "https://api.mercadolibre.com/oauth/token",
      qs.stringify(urlParams),
      {
        headers: {
          "accept": "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
      },
    )

    const data: IRegisterTokenResponse = response.data

    return data

  } catch (error) {
    console.error("Erro no service: ", error)
  }

}