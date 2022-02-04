const { Client, Message, MessageEmbed } = require("discord.js");
const nekos = require("nekos.life");
const {
  sfw: { avatar },
} = new nekos();

module.exports = {
  name: "animeavatar",
  description: "Give you a anime profile picture!",
  aliases: ["animeav, aniav"],
  category: "Image",
  usage: ">>animeavatar",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const { url } = await avatar().catch((e) => message.reply(e.message));
    const embed = new MessageEmbed()
      .setColor("AQUA")
      .setImage(url)
      .setTimestamp();

    if (!url)
      return message.reply({
        content:
          "Sorry but this command cannot be used right now! Please contact the Owner!",
      });

    message.channel.send({ content: "Here you go!", embeds: [embed] });
  },
};
