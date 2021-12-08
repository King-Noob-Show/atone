const { Client, Message, MessageEmbed } = require("discord.js");
const Memer = require("random-jokes-api");

module.exports = {
  name: "quote",
  description: "Tells a random quote!",
  aliases: ["quo"],
  category: "Fun",
  usage: ">>quote",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const quote = Memer.quotes();
    const embed = new MessageEmbed()
      .setTitle("Random Quote")
      .setColor("AQUA")
      .setDescription(quote)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
