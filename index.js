const telegraf = require('telegraf');
require("dotenv").config();
const Extra = require('telegraf/extra');
const fetch = require("node-fetch");

const token = process.env.BOT_TOKEN;
const bot = new telegraf(token);

bot.command('start', ctx => ctx.reply('Welcome'));

bot.command('meme', async ctx => {
    let src = await pic();
    ctx.reply(`<a href="${src}">This is the link of the meme</a>`, Extra.HTML().markup((m) => m.inlineKeyboard([m.callbackButton('Next', 'next')])));
});

bot.action('next', async ctx => {
    let src = await pic();
    ctx.editMessageText(`<a href="${src}">This is the link of the meme</a>`, Extra.HTML().markup((m) => m.inlineKeyboard([m.callbackButton('Next', 'next')])));
})

// Generating picture
async function pic() {
    var url;
    let response = await fetch('https://meme-api.herokuapp.com/gimme/1')
        .catch(err => {
            console.log(err);
        })
    let data = await response.json();
    let memes = await data.memes;
    url = memes[0].url;
    return url;
}
bot.launch();