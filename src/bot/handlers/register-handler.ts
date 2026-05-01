import { Context } from "grammy"

export async function register(ctx: Context): Promise<void> {
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
  
  await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, `✅ Seu TG-code é válido: ${tgCode}`)
}