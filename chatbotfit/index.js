const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

const token = 'COLOQUE O SEU TOKEN AQUI';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  const response = await dialogflow.sendMessage(chatId.toString(), msg.text);

  let textResponse = response.text;

  if (response.intent === 'Treino específico') {
    textResponse = await youtube.searchVideoURL(
      textResponse,
      response.fields.corpo.stringValue
    );
  }

  bot.sendMessage(chatId, textResponse);
});
