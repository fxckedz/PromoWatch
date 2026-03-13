import { Context } from "grammy"
import { MeliService } from "../../service/MeliService.js"

export class AuthHandler {
  constructor(private readonly meliService: MeliService) {}

  handle = async (ctx: Context) => {
    const url = ctx.message?.text

    if(!url) return

    const regex = /code=(TG-[\w-]+)/
    const match = url.match(regex)
    const code = match ? match[1] : null

    if (!code) {
      return ctx.reply("⚠️ Não encontrei um código válido.")
    }

    try {
      await ctx.reply("🔄 Autenticando...")
      await this.meliService.initializeCredentials(code)
      await ctx.reply("✅ Conta vinculada com sucesso!")
    } catch (error: unknown) {
      console.error(error)
      await ctx.reply("🚫 Falha na autenticação.")
    }
  }
}
