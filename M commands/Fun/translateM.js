const { Client, Message, MessageEmbed } = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports = {
  name: "translate",
  description: "Translate a query to another language!",
  aliases: ["trans"],
  category: "Fun",
  usage: ">>translate <language> <query>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const lang = args[0];
    const query = args.slice(1).join(" ");

    if (!lang) {
      message.reply("Please provide a language and a query");
    } else if (!query) {
      message.reply("Please provide a language and a query");
    }

    const trans = await translate(query, { to: lang }).catch((e) => {
      message.reply(e.message);
    });
    message.channel.send(trans.text);
  },
};
