const { Telegraf } = require('telegraf');
const members = require('./members');
require('dotenv').config();

const bot = new Telegraf(process.env.TOKEN);

let message_cash = []; // this array contain all the message ID's that the bot is sending.
let chat_id;


bot.command('about', (ctx) => {
    chat_id = ctx.chat.id;
    bot.telegram.sendMessage(chat_id,`The identity of the developer
is anonymous.`).then((m) => {
        message_cash.push(m.message_id);
    }).catch((err) => {
      console.log(err);
    });
})

// authentication & authorization.
bot.use(async (ctx, next) => {
    chat_id = ctx.chat.id;
    if(ctx.message.from.username === 'fadl0_o' || ctx.message.from.username === 'astro_ali72'){
        await next();
    }
    else {
        bot.telegram.sendMessage(chat_id,'You are not authorized 🙃').then((m) => {
            message_cash.push(m.message_id);
            console.log(`[${ctx.message.from.username}] tries to use your bot`);
        }).catch((err) => {
          console.log(err);
        });
    }
    
});

// handling '/start' command
bot.command('start', (ctx) => {
    console.log("'/start' got called");
    bot.telegram.sendMessage(chat_id,`Welcome to The tagger Bot 👋
Try /help to see all the available commands`).then((m) => {
        message_cash.push(m.message_id);
    }).catch((err) => {
      console.log(err);
    });
});

// handling '/help' command
bot.command('help', (ctx) => {
    console.log("'/help' got called");
    bot.telegram.sendMessage(chat_id,`
Hello and welcome again to the tagger Bot.

This bot is designed specifically for IE morning
Group and it can only tag IE - morning students
by typing the following command /tagall and the
bot will start to tag all the group members
individually. and there is /clear and it simply
will delete all the bot messages.

About the developer : /about

Note: only authorized people 
can use this bot`).then((m) => {
        message_cash.push(m.message_id);
    }).catch((err) => {
      console.log(err);
    });
});

/**
 * handling '/tagall' command
 * this command will send an array
 * of masseges that containing tags
 * of all the members to the desired
 * Gruop.
 */
bot.command('tagall', (ctx) => {
    console.log('number of members :',members.length);
    console.log('Start Tagging all members...');
    bot.telegram.sendMessage(chat_id,'Start Tagging all members..').then((m) => {
        message_cash.push(m.message_id);
    }).catch((err) => {
      console.log(err);
    });
    let counter = 1;
    (function myLoop(i) {
        setTimeout( async function(){ 
            
            if(('@'+ctx.message.from.username) === members[i-1]){
                bot.telegram.sendMessage(chat_id,`${counter} ignored`).then((m) => {
                    message_cash.push(m.message_id);
                }).catch((err) => {
                  console.log(err);
                });
                console.log(counter, `[${members[i-1]}] ignored`);
                counter++;
            }
            else {
                bot.telegram.sendMessage(chat_id,`${counter} ${members[i-1]}`).then((m) => {
                    message_cash.push(m.message_id);
                }).catch((err) => {
                  console.log(err);
                });
                console.log(counter, `[${members[i-1]}] tagged successfully`);
                counter++;
            }

            if(--i){
                myLoop(i); // decrement i and call myLoop again if i > 0
            }
        }, 3000);
    })(members.length);
});


/**
 * the command clear is used to
 * clear the chat from the bot 
 * messeges sometimes it failed to
 * delete all the messages because
 * the bot got a restart on the 
 * server.
 */
bot.command('clear', (ctx) => {
    console.log(message_cash);
    if(message_cash.length > 0){
        (function myLoop(i) {
            setTimeout(async function(){
                await ctx.telegram.deleteMessage(chat_id, message_cash[i-1]);
                message_cash.splice(i-1, 1);
                console.log('massege got deleted from the cash');
                if(--i){
                    myLoop(i); // decrement i and call myLoop again if i > 0
                }
            }, 80);
        })(message_cash.length);
    }
    else {
        console.log('The message cash is clear!');
        ctx.reply('The Group chat is clean 👍');
    }

});


// this callback function is handling the '/about' command


bot.launch(); // this function lunch the app and make it start listening for events.