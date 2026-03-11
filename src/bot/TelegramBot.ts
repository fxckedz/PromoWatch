import { Bot } from "grammy"

export class TelegramBot{
  constructor(private readonly bot: Bot){}

  start(): void {
    console.log("PromoWatch is On 🚀")
    this.bot.start()
  }
}
