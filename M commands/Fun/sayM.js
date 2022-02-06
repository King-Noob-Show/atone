const { Client, Message } = require("discord.js");

module.exports = {
  name: "say",
  description: "Make the bot say something!",
  aliases: ["s"],
  category: "Fun",
  usage: ">>say <input>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const input = args.join(" ");

    if (!input) return message.reply("Please provide a valid input!");

    message.channel.send({ content: `${input.join(" ")}` });
  },
};
