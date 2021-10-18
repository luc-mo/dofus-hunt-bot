import dotenv from 'dotenv';
dotenv.config();
import { Telegraf } from 'telegraf';
import mongoose from 'mongoose';

import {
  startBot,
  resetBot,
  resetBotQuery,
  handleCoords,
  handleDirection,
  handleHint
} from './bot';

const bot = new Telegraf(process.env.BOT_TOKEN);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

bot.start(startBot);

bot.command('reset', resetBot);
bot.action('reset', resetBotQuery);

bot.on('text', handleCoords);
bot.action(/top|right|bottom|left/, handleDirection);
bot.on('callback_query', handleHint);

bot.launch({
  webhook: {
    domain: 'https://dofus-map-bot.herokuapp.com',
    port: process.env.PORT,
  }
});