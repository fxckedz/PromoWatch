import { Context } from "grammy"
import { registerTokenService } from "../../service/register.token.service.js"
import { IRegisterTokenResponse } from "../../service/interfaces/token.interfaces.js"

export async function registerTokenHandler(ctx: Context): Promise<void> {
  if (!ctx.chat) {
    await ctx.reply("❌ Erro: chat não identificado")
    return
  }
  
  const statusMsg = await ctx.reply("🔄 Processando...")
  
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const fullText = ctx.message?.text || ""
  const url = fullText.split(" ")[1]
  
  if (!url) {
    await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, "❌ Envie: /register URL")
    return
  }
  
  const match = url.match(/TG-([a-f0-9]+-[0-9]+)/)
  const tgCode = match ? match[0] : null
  
  if (!tgCode) {
    await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, "❌ URL inválida, código TG não encontrado")
    return
  }

  const tokenData: IRegisterTokenResponse | undefined = await registerTokenService(tgCode)

  if (!tokenData) {
    await ctx.api.editMessageText(
      ctx.chat.id, 
      statusMsg.message_id, 
      "❌ Erro ao registrar token. Tente novamente mais tarde.",
    )
    return
  }

  await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, `
🔐 *Token Mercado Livre Registrado*

📌 *Access Token:*
\`${tokenData.access_token.substring(0, 20)}...\`

🔄 *Refresh Token:*
\`${tokenData.refresh_token.substring(0, 20)}...\`

⏱️ *Expira em:* ${tokenData.expires_in} segundos\`

👤 *User ID:* \`${tokenData.user_id}\`

✅ Token registrado com sucesso!
`)
}