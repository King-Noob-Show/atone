const { Client, Message, MessageEmbed } = require("discord.js");
const Memer = require("random-jokes-api");

module.exports = {
  name: "shower-thought",
  description: "Returns a random shower thought!",
  aliases: ["shower"],
  category: "Fun",
  usage: ">>shower-thought",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const shower = Memer.showerThought();
    const embed = new MessageEmbed()
      .setTitle("Random Shower Thought")
      .setDescription(shower)
      .setColor("AQUA")
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
