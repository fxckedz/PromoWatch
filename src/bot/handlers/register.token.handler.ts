import { Context } from "grammy"
import { registerTokenService } from "../../service/register.token.service.js"

export async function registerTokenHandler(ctx: Context){
  if (!ctx.chat) {
    await ctx.reply("❌ Erro: chat não identificado")
    return
  }
  
  const statusMsg = await ctx.reply("🔄 Processando...")
  
  const telegramId = ctx.from!.id
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

  const tokenData = await registerTokenService(tgCode, telegramId)

  if(!tokenData){
    throw new Error("token veio vazio")
  }

  await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, (`
✅ *Token registrado com sucesso!*

📊 *Dados do registro:*
👤 Telegram ID: \`${tokenData.telegramId}\`
🆔 Mercado Livre ID: \`${tokenData.mercadoLivreId}\`
⏱️ Expira em: ${Math.floor(tokenData.expiresIn / 3600)} horas
📅 Criado em: ${tokenData.createdAt.toLocaleString()}

🔒 Tokens sensíveis foram armazenados com segurança!
`))

}