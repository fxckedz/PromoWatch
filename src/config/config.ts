import "dotenv/config"

export const env = {
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN!,
    DATABASE_URL: process.env.DATABASE_URL!,
    AUTHORIZED: process.env.AUTHORIZED!
}
