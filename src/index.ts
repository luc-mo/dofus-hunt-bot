import dotenv from 'dotenv'
dotenv.config()
import { Telegraf } from 'telegraf'
import mongoose from 'mongoose'
import 'module-alias/register'

import { BotController } from 'controllers/bot'

export const bot = new Telegraf(process.env.BOT_TOKEN!)
mongoose.connect(process.env.MONGO_URI as string)

bot.start(BotController.startBot)
bot.command('help', BotController.helpBot)

bot.command('reset', BotController.resetBot)
bot.action('reset', BotController.resetBotQuery)

bot.on('text', BotController.handleCoordinates)
bot.action(/top|right|bottom|left/, BotController.handleDirection)
bot.on('callback_query', BotController.handleHints)

bot.launch()