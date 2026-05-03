export interface IRegisterTokenParams {
  grant_type: "authorization_code",
  client_id: string,
  client_secret: string,
  code: string,
  redirect_uri: string
  code_verifier?: string
}

export interface IRegisterTokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  user_id: string
}