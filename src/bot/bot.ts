import { Bot } from "grammy"
import { env } from "../config/config.js"

import { registerTokenHandler } from "./handlers/register.token.handler.js"

export const promoWatchBot = new Bot(env.TELEGRAM_TOKEN)

promoWatchBot.command("register", registerTokenHandler)