const { Client, Message } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Tells the ping of the bot",
  usage: ">>ping",
  category: "Information",
  aliases: ["pi"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.reply(`The ping is ${client.ws.ping}`);
  },
};
