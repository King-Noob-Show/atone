const { Client, Message } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["p"],
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
