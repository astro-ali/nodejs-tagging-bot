const fs = require('fs');


/**
 * this function add the message to the message cash json file.
 * @param {*} ctx : object from the message sender
 * @param {*} message : object represent the sent message form the bot
 */
module.exports.addToCache = (ctx, message) => {
  let chat_id = ctx.chat.id;
  let message_id = message.message_id;
  let messages = [];
  try {
    const jsonString = fs.readFileSync('./message_cash.json', 'utf8');
    messages = JSON.parse(jsonString)["cash"];
  } catch(err){
    console.error(err);
  }
  let new_message = { chat_id, message_id };
  messages.push(new_message);
  let to_file = { cash: messages };
  try {
    fs.writeFileSync('./message_cash.json', JSON.stringify(to_file)); 
  } catch(error){
   console.log(error); 
  }
}


/**
 * 
 * @returns messages : array list
 */
module.exports.readCache = () => {
  let messages = [];
  try {
    const jsonString = fs.readFileSync('./message_cash.json', 'utf8');
    messages = JSON.parse(jsonString)["cash"];
  } catch(err){
    console.error(err);
  }
  return messages;
}


/**
 * @param {*} messages : array List.
 */
module.exports.writeInCache = (messages) => {
    let to_file = { cash: messages };
    try {
      fs.writeFileSync('./message_cash.json', JSON.stringify(to_file)); 
    } catch(error){
     console.log(error); 
    }
}