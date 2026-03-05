import "dotenv/config"

class Env {
  public readonly TELEGRAM_TOKEN: string
  public readonly DATABASE_URL: string
  public readonly AUTHORIZED: string

  constructor() {
    this.TELEGRAM_TOKEN = this.required("TELEGRAM_TOKEN")
    this.DATABASE_URL = this.required("DATABASE_URL")
    this.AUTHORIZED = this.required("AUTHORIZED")
  }

  private required(name: string): string {
    const value = process.env[name]

    if (!value) {
      throw new Error(`Missing environment variable: ${name} 🚫`)
    }

    return value
  }
}

export const env = new Env()
