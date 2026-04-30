import "dotenv/config"

export const env = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN!,
  AUTHORIZED: process.env.AUTHORIZED!,

  DATABASE_URL: process.env.DATABASE_URL!,

  ML_ID: process.env.ML_ID!,
  ML_SECRET: process.env.ML_SECRET,
  ML_URI: process.env.ML_URI,
}
