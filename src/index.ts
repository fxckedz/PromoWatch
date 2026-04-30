// index.ts
import { bot, MyContext } from "./bot/bot.js"
import { Composer } from "grammy"

// Agora seus composers também usam MyContext
const welcome = new Composer<MyContext>()

welcome.command("start", async (ctx) => {
  await ctx.reply("Olá! Bem-vindo ao bot!")
})

bot.use(welcome)
bot.start()