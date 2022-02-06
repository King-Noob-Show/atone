const { Client, Message, MessageEmbed } = require("discord.js");
const Memer = require("random-jokes-api");

module.exports = {
  name: "meme",
  description: "Sends a random meme",
  aliases: ["m"],
  category: "Image",
  usage: ">>meme",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const meme = Memer.meme();
    const embed = new MessageEmbed()
      .setTitle(meme.title)
      .setColor("AQUA")
      .setImage(meme.url)
      .setFooter({ text: `Category: ${meme.category}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
