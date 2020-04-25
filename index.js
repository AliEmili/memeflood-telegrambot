const telegraf = require('telegraf');
require("dotenv").config();
const Extra = require('telegraf/extra');
const axios = require("axios").default;
const { data } = require('./creatememe/getData');

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
    // let response = await fetch('http://meme-api.herokuapp.com/gimme/1')
    //     .catch(err => {
    //         console.log(err);
    //     })
    // let data = await response.json();
    // let memes = await data.memes;
    // url = memes[0].url;
    // return url;
    // let response = await axios.get('https://meme-api.herokuapp.com/gimme/1')
    //     .catch(err => console.log(err));
    // let data = await response.data;
    // let meme = await data.memes[0];
    // let url = await meme.url;
    // return url;

    let res = await data();
    let url = await res.memes[0].url;
    return url;

}
bot.launch();