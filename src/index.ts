import { Bot } from "grammy"
import { TelegramBot } from "./bot/TelegramBot.js"
import { env } from "./config/Env.js"

const bot = new TelegramBot(new Bot(env.TELEGRAM_TOKEN))

bot.start()
