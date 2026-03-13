import { Bot } from "grammy"
import { AuthHandler } from "./handlers/AuthHandler.js"
export class TelegramBot{
  constructor(private readonly bot: Bot, private readonly authHandler: AuthHandler){
    this.onAuth()
  }

  private onAuth() {
    this.bot.command("auth", this.authHandler.handle)
  }

  start(): void {
    console.log("PromoWatch is On 🚀")
    this.bot.start()
  }
}
