const { Client, Message, MessageEmbed } = require("discord.js");

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
    const embed = new MessageEmbed()
      .setTitle(
        `***Latency is ${
          Date.now() - message.createdTimestamp
        }ms and API Latency is ${Math.round(client.ws.ping)}.***`
      )
      .setTimestamp()
      .setColor("AQUA");
  },
};
