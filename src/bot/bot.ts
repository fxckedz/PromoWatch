import { Bot } from "grammy"
import { env } from "../config/config.js"

export const promoWatchBot = new Bot(env.TELEGRAM_TOKEN)