import { Bot, Context } from "grammy"
import { hydrate, HydrateFlavor } from "@grammyjs/hydrate"
import { env } from "../config/config.js"

export type MyContext = HydrateFlavor<Context>

export const bot = new Bot<MyContext>(env.TELEGRAM_TOKEN)

bot.use(hydrate())