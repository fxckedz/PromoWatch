import { Bot } from "grammy"
import { TelegramBot } from "./bot/TelegramBot.js"
import { env } from "./config/Env.js"
import { AuthHandler } from "./bot/handlers/AuthHandler.js"
import { MeliService } from "./service/MeliService.js"
import { IntegrationRepository } from "./repository/IntegrationRepository.js"

const repository = new IntegrationRepository()
const meliServce = new MeliService(repository)
const authHandler = new AuthHandler(meliServce)

const bot = new TelegramBot(new Bot(env.TELEGRAM_TOKEN), authHandler)

bot.start()
