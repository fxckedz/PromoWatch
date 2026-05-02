import { Bot } from "grammy"
import { env } from "../config/config.js"

import { registerAccountHandler } from "./handlers/register-account-handler.js"

export const promoWatchBot = new Bot(env.TELEGRAM_TOKEN)

promoWatchBot.command("register", registerAccountHandler)