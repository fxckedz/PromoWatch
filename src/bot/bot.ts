import { Bot } from "grammy"
import { env } from "../config/config.js"

import { register } from "./handlers/register-handler.js"

export const promoWatchBot = new Bot(env.TELEGRAM_TOKEN)

promoWatchBot.command("register", register)